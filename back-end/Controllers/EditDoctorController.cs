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
    public async Task<ActionResult<string>> GetDoctors()
    {
        return "I'm here";
    }
    [HttpPost]
    public async Task<ActionResult<string>> editDoctor([FromForm] EditDoctorRequest editDoctorRequest)
    {
        Console.WriteLine("I'm here");
        Console.WriteLine(editDoctorRequest.Avatar);
        if (editDoctorRequest.Avatar != null)
        {
            var imagesPath = Path.Combine(Directory.GetCurrentDirectory(), "images");
            var filePath = Path.Combine(imagesPath, editDoctorRequest.Avatar.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await editDoctorRequest.Avatar.CopyToAsync(stream);
            }
        }
        return "Hello";
    }

}