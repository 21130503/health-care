using Microsoft.AspNetCore.Mvc;
using MyWebApi.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
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

    [HttpGet("{id}")]
    public async Task<ActionResult<string>> GetPatient(int id)
    {
        var patient = await _context.Patients.FindAsync(id);

        if (patient == null)
        {
            return NotFound();
        }

        return "hello";
    }

    [HttpPost]
    public async Task<ActionResult<Patient>> PostPatient(Patient patient)
    {
        _context.Patients.Add(patient);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetProduct", new { id = patient.Id }, patient);
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
