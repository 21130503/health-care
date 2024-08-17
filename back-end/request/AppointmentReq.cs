public class AppointmentRequest
{
    public int PatientId { get; set; }
    public int primaryPhysicianId { get; set; }
    public DateTime Schedule { get; set; }
    public string Status { get; set; }
    public string Reason { get; set; }
    public int UserId { get; set; }
    public string? Notes { get; set; }
}
public class CancelAppointmentRequest
{
    public int AppointmentId { get; set; }
    public string Reason { get; set; }
    public string Status { get; set; }
}