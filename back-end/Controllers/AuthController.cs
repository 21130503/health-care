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
    public async Task<ActionResult<Auth>> AuthLogin([FromBody] AuthLogin loginRequest)
    {
        Console.WriteLine(loginRequest.email);
        if (loginRequest == null || string.IsNullOrEmpty(loginRequest.email) || string.IsNullOrEmpty(loginRequest.phone))
        {
            return BadRequest(new
            {
                status = 500,
                message = "Invalid login request"
            });
        }
        var user = await _context.Users
        .FirstOrDefaultAsync(d => d.Email == loginRequest.email && d.Phone == loginRequest.phone);
        if (user == null)
        {
            return NotFound("Doctor not found or invalid credentials");
        }

        return Ok(new
        {
            status = 200,
            user = user
        });
    }
    [HttpPost("register")]
    public async Task<ActionResult<string>> AuthRegister([FromBody] AuthRegister registerRequest)
    {
        if (registerRequest == null || string.IsNullOrEmpty(registerRequest.email) || string.IsNullOrEmpty(registerRequest.phone) || string.IsNullOrEmpty(registerRequest.name))
        {
            return BadRequest("Invalid register request");
        }
        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == registerRequest.email);
        if (existingUser != null)
        {
            Console.WriteLine("Có user rồi");
            return BadRequest(new
            {
                status = 500,
                message = "Email address already exists",
            });
        }
        Console.WriteLine("Chưa có user");

        var user = new Auth
        {
            Email = registerRequest.email,
            Phone = registerRequest.phone,
            Name = registerRequest.name,
            // Map other necessary fields
        };
        _context.Users.Add(user);
        var newUser = await _context.SaveChangesAsync();
        if (newUser > 0)
        {
            return Ok(new
            {
                status = 200,
                message = "Register success",
                user = new
                {
                    id = user.Id,
                    name = user.Name,
                    phone = user.Phone,
                    email = user.Email
                }
            });
        }
        else
        {
            return BadRequest(new
            {
                status = 500,
                message = "Register failure"
            });
        }
    }

}