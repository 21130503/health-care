using Microsoft.AspNetCore.Mvc;
using MyWebApi.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("[controller]")]
[ApiController]
public class PatientController : ControllerBase
{
    private readonly AppDbContext _context;

    public PatientController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
    {
        return await _context.Patients.ToListAsync();
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<Patient>> GetPatientByIdUser(int userId)
    {
        if (userId > 0)
        {
            Console.WriteLine("Getting patient by user id: " + userId.ToString());
        }
        else
        {
            Console.WriteLine("Invalid id: " + userId.ToString());
        }

        var patient = await _context.Patients
                    .Where(p => p.UserId == userId)
                    .OrderBy(p => p.Id)
                    .LastOrDefaultAsync();

        if (patient == null)
        {
            return NotFound();
        }

        return patient;
    }

    [HttpPost("add")]
    public async Task<ActionResult<Patient>> PostPatient([FromForm] AddPatient addPatient)
    {
        Console.WriteLine("Creating ", addPatient.address);
        var imagesPath = "";
        if (addPatient.identificationDocument != null)
        {
            imagesPath = Path.Combine(Directory.GetCurrentDirectory(), "images");
            var filePath = Path.Combine(imagesPath, addPatient.identificationDocument.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await addPatient.identificationDocument.CopyToAsync(stream);
            }
        }
        var patient = new Patient
        {
            Email = addPatient.email,
            Phone = addPatient.phone,
            UserId = addPatient.userId,
            Name = addPatient.name,
            privacyConsent = addPatient.privacyConsent,
            Gender = addPatient.gender,
            BirthDate = addPatient.birthDate,
            Address = addPatient.address,
            Occupation = addPatient.occupation,
            EmergencyContactName = addPatient.emergencyContactName,
            EmergencyContactNumber = addPatient.emergencyContactNumber,
            InsuranceProvider = addPatient.insuranceProvider,
            InsurancePolicyNumber = addPatient.insurancePolicyNumber,
            allergies = addPatient.allergies,
            currentMedication = addPatient.currentMedication,
            familyMedicalHistory = addPatient.familyMedicalHistory,
            pastMedicalHistory = addPatient.pastMedicalHistory,
            identificationType = addPatient.identificationType,
            identificationDocument = imagesPath,
            identificationNumber = addPatient.identificationNumber,
            PrimaryPhysician = addPatient.primaryPhysician,
            treatmentConsent = addPatient.treatmentConsent,
            disclosureConsent = addPatient.disclosureConsent,
        };
        _context.Patients.Add(patient);
        var res = await _context.SaveChangesAsync();

        if (res > 0)
        {
            return Ok(new
            {
                status = 200,
                message = "Patient added successfully",
                idPatient = patient.Id
            });
        }
        else
        {
            return StatusCode(500, "Error adding patient");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutPatient(int id, Patient patient)
    {
        if (id != patient.Id)
        {
            return BadRequest();
        }

        _context.Entry(patient).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePatient(int id)
    {
        var patient = await _context.Patients.FindAsync(id);
        if (patient == null)
        {
            return NotFound();
        }

        _context.Patients.Remove(patient);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
