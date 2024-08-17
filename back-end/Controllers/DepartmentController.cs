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
    [HttpPost("add")]
    public async Task<ActionResult<Department>> AddDepartment(DepartmentReq departmentReq)
    {
        var department = new Department
        {
            Name = departmentReq.Name
        };
        await _context.Departments.AddAsync(department);
        var res = await _context.SaveChangesAsync();
        if (res > 0)
        {
            return Ok(new
            {
                status = 200,
                message = "Department added successfully",
                departmentId = department.Id
            });
        }
        else
        {
            return Ok(new
            {
                status = 500,
                message = "Department failed ",
                departmentId = department.Id
            });
        }
    }
}