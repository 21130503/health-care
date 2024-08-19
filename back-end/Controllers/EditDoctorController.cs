using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using MyWebApi.Data;

[Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
[ApiController]
public class EditDoctorController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IHubContext<NotificationHub> _hubContext;
    public EditDoctorController(AppDbContext context, IHubContext<NotificationHub> hubContext)
    {
        _context = context;
        _hubContext = hubContext;
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
            avatar = "http://localhost:5228/images/" + editDoctorRequest.Avatar.FileName,
            department = editDoctorRequest.Department,
            dateOfBirth = editDoctorRequest.DateOfBirth
        };
        _context.TemporaryDoctors.Add(editDoctorValue);
        var editDoctor = await _context.SaveChangesAsync();
        if (editDoctor != null)
        {
            // Gửi thông báo cho admin
            await _hubContext.Clients.All.SendAsync("ReceiveNotification", await getAllDoctorTemporary());

            Console.WriteLine("EditDoctor success");
            return Ok("Doctor edited successfully");
        }
        else
        {
            return BadRequest("Failed to edit doctor");
        }
    }
    [HttpGet("allDoctorTemporary")]
    public async Task<ActionResult<IEnumerable<EditDoctor>>> getAllDoctorTemporary()
    {
        return await _context.TemporaryDoctors.OrderByDescending(d => d.id).ToListAsync();
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<EditDoctor>> getTemporaryDoctor(int id)
    {
        var temporary = await _context.TemporaryDoctors.FirstOrDefaultAsync(d => d.id == id);
        if (temporary == null)
        {
            return NotFound("Doctor not found");
        }
        return temporary;
    }
    [HttpPost("changeTemporary")]
    public async Task<ActionResult<EditDoctor>> ChangeTemporary([FromBody] TemporaryDoctorRequest temporaryDoctorRequest)

    {
        EmailService emailServices = new EmailService();
        EditDoctor temporaryDoctor = new EditDoctor();
        if (temporaryDoctorRequest.type == "accept")
        {
            temporaryDoctor = await _context.TemporaryDoctors.FirstOrDefaultAsync(d => d.id == temporaryDoctorRequest.id);
            var idDoctor = temporaryDoctor.userId;
            var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.id == idDoctor);
            doctor.email = temporaryDoctor.email;
            doctor.phone = temporaryDoctor.phone;
            doctor.password = temporaryDoctor.password;
            doctor.name = temporaryDoctor.name;
            doctor.gender = temporaryDoctor.gender;
            doctor.avatar = temporaryDoctor.avatar;
            doctor.department = temporaryDoctor.department;
            doctor.dateOfBirth = temporaryDoctor.dateOfBirth;
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                var result_delete = await DeleteTemporary(temporaryDoctor.userId);

                emailServices.SendEmail(temporaryDoctorRequest.email, "About changing your information", "Your request to change information has been approved.");

                return Ok(new
                {
                    status = 200,
                    message = "Doctor record has been added/updated successfully."
                });
            }
            else
            {
                return StatusCode(500, "An error occurred while saving the doctor record.");
            }

        }
        else
        {
            var result = await DeleteTemporary(temporaryDoctor.userId);

            if (result.Value > 0)
            {
                // Xử lý khi xóa thành công
                emailServices.SendEmail(temporaryDoctorRequest.email, "About changing your information", "Your request to change information has been denied because it does not comply with regulations.");
                return Ok(new
                {
                    status = 200,
                    message = "Doctor deleted successfully."
                });
            }
            else
            {
                return BadRequest("Failed to delete doctor");
            }

        }
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<int>> DeleteTemporary(int userId)
    {
        // Tìm bản ghi dựa trên userId
        var doctor = await _context.TemporaryDoctors
                                   .FirstOrDefaultAsync(t => t.userId == userId);
        if (doctor == null)
        {
            return NotFound();
        }
        _context.TemporaryDoctors.Remove(doctor);
        var result = await _context.SaveChangesAsync();
        return Ok(result);
    }

}