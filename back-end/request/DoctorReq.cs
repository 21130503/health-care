using System.ComponentModel.DataAnnotations;

public class DoctorLoginRequest
{
    public string email { get; set; }
    public string password { get; set; }
}


public class EditDoctorRequest
{
    public int UserId { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Name { get; set; }
    public string Phone { get; set; }
    public string Gender { get; set; }
    public IFormFile Avatar { get; set; }
    public string Department { get; set; }
    public DateTime DateOfBirth { get; set; }
}
public class AddDoctorRequest
{
    public string Email { get; set; }
    public string Name { get; set; }
    public string Phone { get; set; }
    public string Gender { get; set; }
    public IFormFile Avatar { get; set; }
    public string Department { get; set; }
    public DateTime DateOfBirth { get; set; }
}
