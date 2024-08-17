public class AddPatient
{
    public string name { get; set; }
    public string email { get; set; }
    public string phone { get; set; }
    public DateTime birthDate { get; set; }
    public string gender { get; set; }
    public string address { get; set; }
    public string occupation { get; set; }
    public string emergencyContactName { get; set; }
    public string emergencyContactNumber { get; set; }
    public string primaryPhysician { get; set; }
    public string insuranceProvider { get; set; }
    public string insurancePolicyNumber { get; set; }
    public int userId { get; set; }
    public string allergies { get; set; }
    public string currentMedication { get; set; }
    public string familyMedicalHistory { get; set; }
    public string pastMedicalHistory { get; set; }
    public string identificationType { get; set; }
    public string identificationNumber { get; set; }
    public IFormFile identificationDocument { get; set; }
    public bool treatmentConsent { get; set; }
    public bool disclosureConsent { get; set; }
    public bool privacyConsent { get; set; }
}