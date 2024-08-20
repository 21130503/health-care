using Microsoft.AspNetCore.SignalR;

public class NotificationHub : Hub
{
    public async Task SendNotification(List<EditDoctor> temporaryDoctor)
    {
        await Clients.All.SendAsync("ReceiveNotification", temporaryDoctor);
    }
    public async Task SendMessage(List<Message> messages)
    {
        await Clients.All.SendAsync("ReceiveMessage", messages);
    }
}
