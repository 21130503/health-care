using Microsoft.AspNetCore.Mvc;
using MyWebApi.Data;
[Route("[controller]")]
[ApiController]
public class AppointmentController : ControllerBase
{
    private readonly AppDbContext _context;
    public AppointmentController(AppDbContext context)
    {
        _context = context;
    }
    [HttpPost("add")]
    public async Task<ActionResult<Appointment>> addAppointment(AppointmentRequest appointmentRequest)
    {
        Console.WriteLine("Appointment ", appointmentRequest.PatientId);
        var appointment = new Appointment
        {
            PatientId = appointmentRequest.PatientId,
            primaryPhysicianId = appointmentRequest.primaryPhysicianId,
            Schedule = appointmentRequest.Schedule,
            Status = appointmentRequest.Status,
            UserId = appointmentRequest.UserId,
            Reason = appointmentRequest.Reason,
            Notes = appointmentRequest.Notes
        };
        _context.Appointments.Add(appointment);
        var res = await _context.SaveChangesAsync();

        if (res > 0)
        {
            return Ok(new
            {
                status = 200,
                message = "Patient added successfully",
                appointmentId = appointment.Id
            });
        }
        else
        {
            return StatusCode(500, "Error adding patient");
        }
    }
}