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
            Notes = appointmentRequest.Note
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
    public async Task<ActionResult<Appointment>> GetAppointmentById(int id)
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
    [HttpGet("all")]
    public async Task<ActionResult<List<AnyType>>> GetAllAppointmentsByAdmin()
    {
        var appointments = await _context.Appointments
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
            return NotFound($"No appointments found ");
        }

        return Ok(appointments);
    }
    [HttpGet("all/doctor/{doctorId}")]
    public async Task<ActionResult<List<AnyType>>> GetAllAppointmentsByDoctor(int doctorId)
    {
        var appointments = await _context.Appointments
                            .Where(a => a.primaryPhysicianId == doctorId)
                            .Join(
                                _context.Patients,
                               appointment => appointment.PatientId,
                               patient => patient.Id,
                               (appointment, patient) => new
                               {
                                   id = appointment.Id,
                                   patientName = patient.Name,
                                   status = appointment.Status,
                                   schedule = appointment.Schedule,
                                   patientId = patient.Id,
                                   primaryPhysicianId = appointment.primaryPhysicianId,
                                   reason = appointment.Reason,
                                   notes = appointment.Notes,
                                   userId = appointment.UserId,
                               }

                            ).ToListAsync();

        if (appointments == null || appointments.Count == 0)
        {
            return NotFound($"No appointments found ");
        }

        return Ok(appointments);
    }
    [HttpGet("date/{doctorId}")]
    public async Task<ActionResult<IEnumerable<Appointment>>> getAppointmentTodayByDoctor(int doctorId)
    {
        var today = DateTime.Today;
        Console.WriteLine("Date: " + today);

        var appointments = await _context.Appointments
            .Where(a => a.primaryPhysicianId == doctorId && a.Schedule.Date == today && a.Status == "Pending")
            .ToListAsync();
        return Ok(appointments);
    }

    [HttpGet("status/{status}")]
    public async Task<ActionResult<List<AnyType>>> GetAppointmentsByStatus(string status)
    {
        var appointments = await _context.Appointments
                            .Where(a => a.Status == status)
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
            return NotFound($"No appointments found ");
        }

        return Ok(appointments);
    }
    [HttpPut("cancel")]
    public async Task<ActionResult<Appointment>> cancelAppointment(CancelAppointmentRequest cancelAppointmentRequest)
    {
        // Tìm cuộc hẹn dựa trên AppointmentId
        var appointment = await _context.Appointments.FindAsync(cancelAppointmentRequest.AppointmentId);

        if (appointment == null)
        {
            return NotFound($"Appointment with ID {cancelAppointmentRequest.AppointmentId} not found.");
        }

        // Cập nhật các trường theo yêu cầu
        appointment.Reason = cancelAppointmentRequest.Reason;
        appointment.Status = cancelAppointmentRequest.Status;

        // Lưu thay đổi vào cơ sở dữ liệu
        await _context.SaveChangesAsync();

        return StatusCode(200, "Appointment updated successfully.");
    }

}
