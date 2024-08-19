using System.Net;
using System.Net.Mail;

public class EmailService
{
    public void SendEmail(string toEmailAddress, string subject, string body)
    {
        var fromAddress = new MailAddress("21130503@st.hcmuaf.edu.vn", "Hopital"); // Thay thế bằng địa chỉ email của bạn
        var toAddress = new MailAddress(toEmailAddress);
        const string fromPassword = "mgtltwhldwvqriie"; // Thay thế bằng mật khẩu email của bạn

        var smtp = new SmtpClient
        {
            Host = "smtp.gmail.com",
            Port = 587,
            EnableSsl = true,
            DeliveryMethod = SmtpDeliveryMethod.Network,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
        };


        using (var message = new MailMessage(fromAddress, toAddress)
        {
            Subject = subject,
            Body = body
        })
        {
            smtp.Send(message);
        }
    }
}
