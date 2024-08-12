using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWebApi.Data;
[Microsoft.AspNetCore.Mvc.Route("[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    public AuthController(AppDbContext context)
    {
        _context = context;
    }
    [HttpPost("login")]
    public async Task<ActionResult<Auth>> getDoctor([FromBody] AuthLogin loginRequest)
    {
        Console.WriteLine(loginRequest.email);
        if (loginRequest == null || string.IsNullOrEmpty(loginRequest.email) || string.IsNullOrEmpty(loginRequest.phone))
        {
            return BadRequest("Invalid login request");
        }
        var user = await _context.Users
        .FirstOrDefaultAsync(d => d.Email == loginRequest.email && d.Phone == loginRequest.phone);
        if (user == null)
        {
            return NotFound("Doctor not found or invalid credentials");
        }

        return Ok(user);
    }
    // public async Task<

}