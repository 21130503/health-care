using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWebApi.Data;
[Microsoft.AspNetCore.Mvc.Route("[controller]")]
[ApiController]
public class TopicController : ControllerBase
{
    private readonly AppDbContext _context;
    public TopicController(AppDbContext context)
    {
        _context = context;
    }
    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<Topic>>> getAllTopics()
    {
        return await _context.Topics.ToListAsync();
    }
}