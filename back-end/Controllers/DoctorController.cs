using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWebApi.Data;

[Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
[ApiController]
public class DoctorController : ControllerBase
{
    private readonly AppDbContext _context;
    public DoctorController(AppDbContext context)
    {
        _context = context;
    }
    private static string GenerateRandomPassword(int length)
    {
        const string validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()";
        Random random = new Random();
        return new string(Enumerable.Repeat(validChars, length)
            .Select(s => s[random.Next(s.Length)]).ToArray());
    }
    [HttpPost]
    public async Task<ActionResult<Doctor>> getDoctor([FromBody] DoctorLoginRequest loginRequest)
    {
        Console.WriteLine(loginRequest.email);
        if (loginRequest == null || string.IsNullOrEmpty(loginRequest.email) || string.IsNullOrEmpty(loginRequest.password))
        {
            return BadRequest("Invalid login request");
        }
        var doctor = await _context.Doctors
        .FirstOrDefaultAsync(d => d.email == loginRequest.email && d.password == loginRequest.password);
        if (doctor == null)
        {
            return NotFound("Doctor not found or invalid credentials");
        }

        return Ok(doctor);
    }
    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<Doctor>>> getListDoctors()
    {
        return await _context.Doctors.ToListAsync();
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Doctor>> getDoctorById(int id)
    {
        var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.id == id);
        if (doctor == null)
        {
            return NotFound("Doctor not found");
        }
        return doctor;
    }
    [HttpPost("add")]
    public async Task<ActionResult<Doctor>> AddDoctor([FromForm] AddDoctorRequest addDoctorRequest)
    {
        if (addDoctorRequest.Avatar != null)
        {
            var imagesPath = Path.Combine(Directory.GetCurrentDirectory(), "images");
            var filePath = Path.Combine(imagesPath, addDoctorRequest.Avatar.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await addDoctorRequest.Avatar.CopyToAsync(stream);
            }
        }
        var doctor = new Doctor
        {
            email = addDoctorRequest.Email,
            phone = addDoctorRequest.Phone,
            avatar = "http://localhost:5228/images/" + addDoctorRequest.Avatar.FileName,
            name = addDoctorRequest.Name,
            gender = addDoctorRequest.Gender,
            department = addDoctorRequest.Department,
            dateOfBirth = addDoctorRequest.DateOfBirth,
            password = GenerateRandomPassword(10) // Generate random password
        };
        _context.Doctors.Add(doctor);
        var res = await _context.SaveChangesAsync();
        if (res > 0)
        {
            EmailService emailServices = new EmailService();
            emailServices.SendEmail(doctor.email, "Welcome to Healthcare System", "Your account has been created successfully. Your password is: " + doctor.password);
            return Ok(new
            {
                status = 200,
                message = "Doctor added successfully",
                doctorId = doctor.id
            });
        }
        else
        {
            return StatusCode(500, "Error adding doctor");
        }

    }
}