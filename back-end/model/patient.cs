public class Patient
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public DateTime BirthDate { get; set; }
    public string Gender { get; set; }
    public string Address { get; set; }
    public string Occupation { get; set; }
    public string EmergencyContactName { get; set; }
    public string EmergencyContactNumber { get; set; }
    public string PrimaryPhysician { get; set; }
    public string InsuranceProvider { get; set; }
    public string InsurancePolicyNumber { get; set; }
    public int UserId { get; set; }
    public string allergies { get; set; }
    public string currentMedication { get; set; }
    public string familyMedicalHistory { get; set; }
    public string pastMedicalHistory { get; set; }
    public string identificationType { get; set; }
    public string identificationNumber { get; set; }
    public string identificationDocument { get; set; }
    public bool treatmentConsent { get; set; }
    public bool disclosureConsent { get; set; }
    public bool privacyConsent { get; set; }
}