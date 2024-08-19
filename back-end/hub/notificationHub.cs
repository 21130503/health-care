using Microsoft.AspNetCore.SignalR;

public class NotificationHub : Hub
{
    public async Task SendNotification(List<EditDoctor> temporaryDoctor)
    {
        await Clients.All.SendAsync("ReceiveNotification", temporaryDoctor);
    }
}
