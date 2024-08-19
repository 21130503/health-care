using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWebApi.Data;
[Microsoft.AspNetCore.Mvc.Route("[controller]")]
[ApiController]
public class MessageController : ControllerBase
{
    private readonly AppDbContext _context;
    public MessageController(AppDbContext context)
    {
        _context = context;
    }
    [HttpGet("{topic}")]
    public async Task<ActionResult<IEnumerable<Message>>> GetMessages(int topic)
    {
        return await _context.Messages.Where(m => m.topicId == topic).ToListAsync();
    }
}