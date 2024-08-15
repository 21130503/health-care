using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;
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
    [HttpGet("{id}")]
    public async Task<ActionResult<Appointment>> GetAppointmentByIdUser(int id)
    {
        var appointment = _context.Appointments.FirstOrDefault(x => x.Id == id);
        if (appointment == null)
        {
            return NotFound("Not Found");
        }
        else
        {
            return Ok(appointment);
        }
    }
    [HttpGet("all/{userId}")]
    public async Task<ActionResult<List<AnyType>>> GetAllAppointmentsByUser(int userId)
    {
        var appointments = await _context.Appointments
                           .Where(a => a.UserId == userId)
                           .Join(
                               _context.Patients,
                               appointment => appointment.PatientId,
                               patient => patient.Id,
                               (appointment, patient) => new { appointment, patient }
                           )
                           .Join(
                               _context.Doctors,
                               ap => ap.appointment.primaryPhysicianId,
                               doctor => doctor.id,
                               (ap, doctor) => new
                               {
                                   name = ap.patient.Name,
                                   status = ap.appointment.Status,
                                   schedule = ap.appointment.Schedule,
                                   doctor = doctor.name,
                                   avatarDoctor = doctor.avatar,
                                   patientId = ap.patient.Id,
                                   appointmentId = ap.appointment.Id,


                               }
                           )
                           .ToListAsync();
        if (appointments == null || appointments.Count == 0)
        {
            return NotFound($"No appointments found for user with ID {userId}");
        }

        return Ok(appointments);
    }
}