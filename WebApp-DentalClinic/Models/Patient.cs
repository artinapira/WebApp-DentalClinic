namespace WebApp_DentalClinic.Models
{
    public class Patient
    {
        public int PatientId { get; set; }

        public string EmriMbiemri { get; set; } = null!;

        public DateOnly? DataLindjes { get; set; }

        public string? Gjinia { get; set; }

        public string Username { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; } = null!;
        public byte[] PasswordSalt { get; set; } = null!;

        public virtual ICollection<Terminet> Terminets { get; set; } = new List<Terminet>();

        public virtual ICollection<Ankesat> Ankesats { get; set; } = new List<Ankesat>();

        public virtual ICollection<MedicalRecord> MedicalRecords { get; set; } = new List<MedicalRecord>();

        public virtual ICollection<PatientNote> PacientNotes { get; set; } = new List<PatientNote>();

        public virtual ICollection<Prescription> Prescriptions { get; set; } = new List<Prescription>();

        public virtual ICollection<Vlersimet> Vlersimets { get; set; } = new List<Vlersimet>();
    }
}
