using Microsoft.EntityFrameworkCore;
using WebApp_DentalClinic.Models;

namespace WebApp_DentalClinic
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Patient> Patients { get; set; }

        public DbSet<Dentist> Dentists { get; set; }

        public DbSet<Terminet> Terminets { get; set; }

        public DbSet<Department> Departments { get; set; }

    }
}
