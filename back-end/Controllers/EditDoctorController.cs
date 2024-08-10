using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWebApi.Data;

[Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
[ApiController]
public class EditDoctorController : ControllerBase
{
    private readonly AppDbContext _context;
    public EditDoctorController(AppDbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<ActionResult<Doctor>> getDoctorById(int id)
    {
        return await _context.Doctors.FirstOrDefaultAsync(d => d.id == id);
    }
    [HttpPost]
    public async Task<ActionResult<string>> editDoctor([FromForm] EditDoctorRequest editDoctorRequest)
    {
        var doctor = await getDoctorById(editDoctorRequest.UserId);
        var imagesPath = doctor.Value.avatar;
        if (editDoctorRequest.Avatar != null)
        {
            imagesPath = Path.Combine(Directory.GetCurrentDirectory(), "images");
            var filePath = Path.Combine(imagesPath, editDoctorRequest.Avatar.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await editDoctorRequest.Avatar.CopyToAsync(stream);
            }
        }
        var editDoctorValue = new EditDoctor
        {
            userId = editDoctorRequest.UserId,
            name = editDoctorRequest.Name,
            email = editDoctorRequest.Email,
            phone = editDoctorRequest.Phone,
            password = editDoctorRequest.Password,
            gender = editDoctorRequest.Gender,
            avatar = imagesPath,
            department = editDoctorRequest.Department,
            dateOfBirth = editDoctorRequest.DateOfBirth
        };
        _context.TemporaryDoctors.Add(editDoctorValue);
        var editDoctor = await _context.SaveChangesAsync();
        if (editDoctor != null)
        {
            Console.WriteLine("EditDoctor success");
            return Ok("Doctor edited successfully");
        }
        else
        {
            return BadRequest("Failed to edit doctor");
        }
    }

}