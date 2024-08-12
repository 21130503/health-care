using Microsoft.AspNetCore.SignalR;

public class NotificationHub : Hub
{
    public async Task SendNotification(EditDoctor temporaryDoctor)
    {
        var message = new
        {
            title = "Bạn có thông báo mới",
            doctor = temporaryDoctor
        };
        await Clients.All.SendAsync("ReceiveNotification", message);
    }
}
