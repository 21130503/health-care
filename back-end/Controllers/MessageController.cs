using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using MyWebApi.Data;
[Microsoft.AspNetCore.Mvc.Route("[controller]")]
[ApiController]
public class MessageController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IHubContext<NotificationHub> _hubContext;

    public MessageController(AppDbContext context, IHubContext<NotificationHub> hubContext)
    {
        _context = context;
        _hubContext = hubContext;
    }
    [HttpGet("{topic}")]
    public async Task<ActionResult<IEnumerable<Message>>> GetMessages(int topic)
    {
        return await _context.Messages.Where(m => m.topicId == topic).ToListAsync();
    }
    [HttpPost("addMessage")]
    public async Task<ActionResult<Message>> AddMessage(MessageRequest messageRequest)
    {
        var newMessage = new Message
        {
            message = messageRequest.message,
            topicId = messageRequest.topicId,
            from = messageRequest.from
        };
        _context.Messages.Add(newMessage);
        var res = await _context.SaveChangesAsync();
        if (res > 0)
        {
            // Gửi thông báo cho admin
            await _hubContext.Clients.All.SendAsync("ReceiveMessage", await GetMessages(messageRequest.topicId));

            return Ok(newMessage);
        }
        else
        {
            return BadRequest("AddMessage Failed");
        }
    }
}