using Microsoft.EntityFrameworkCore;
using WebApp_DentalClinic.Models;

namespace WebApp_DentalClinic
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Patient> Patients { get; set; }

        public DbSet<Dentist> Dentists { get; set; }

        public DbSet<Admin> Admins { get; set; }

        public DbSet<Terminet> Terminets { get; set; }

        public DbSet<Department> Departments { get; set; }

        public DbSet<Inventary> Inventaries { get; set; }

        public DbSet<Knowledge> Knowledges { get; set; }

        public DbSet<Partner> Partners{ get; set; }

        public DbSet<Vlersimet> Vlersimett { get; set; }

        public DbSet<Marketing> Marketings { get; set; }

        public DbSet<PatientNote> PatientNotes { get; set; }

        public DbSet<SherbimeShtese> SherbimeShteses { get; set; }

        public DbSet<Prescription> Prescriptions { get; set; }

        public DbSet<MedicalRecord> MedicalRecords { get; set; }

        public DbSet<Terapia> Terapias { get; set; }

        public DbSet<Ankesat> Ankesats { get; set; }

        public DbSet<Kontakti> Kontaktis { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Add the indexing here
            modelBuilder.Entity<Patient>()
                .HasIndex(p => p.EmriMbiemri);

            modelBuilder.Entity<Dentist>()
        .HasIndex(d => d.EmriMbiemri);

            // Any other model configuration
            base.OnModelCreating(modelBuilder);
        }

    }
}
