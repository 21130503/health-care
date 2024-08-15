using Microsoft.EntityFrameworkCore;

namespace MyWebApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<EditDoctor> TemporaryDoctors { get; set; }
        public DbSet<Auth> Users { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
    }
}
