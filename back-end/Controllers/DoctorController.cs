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
    public async Task<ActionResult<Doctor>> GetPatientByIdUser(int id)
    {
        var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.id == id);
        if (doctor == null)
        {
            return NotFound("Doctor not found");
        }
        return doctor;
    }

}