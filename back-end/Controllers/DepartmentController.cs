using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWebApi.Data;

[Route("[controller]")]
[ApiController]
public class DepartmentController : ControllerBase
{
    public readonly AppDbContext _context;
    public DepartmentController(AppDbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Department>>> GetDepartments()
    {
        return await _context.Departments.ToListAsync();
    }
}