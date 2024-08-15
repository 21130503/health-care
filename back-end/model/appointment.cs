public class Appointment
{
    public int Id { get; set; }
    public int PatientId { get; set; }
    public int primaryPhysicianId { get; set; }
    public DateTime Schedule { get; set; }
    public string Status { get; set; }
    public string Reason { get; set; }
    public string Notes { get; set; }
    public int UserId { get; set; }
}