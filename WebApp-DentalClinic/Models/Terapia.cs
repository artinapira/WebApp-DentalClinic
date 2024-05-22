namespace WebApp_DentalClinic.Models
{
    public class Terapia
    {
        public int TerapiaId { get; set; }

        public string Emri { get; set; } = null!;

        public string Pershkrimi { get; set; } = null!;

        public virtual ICollection<Prescription> Prescriptions { get; set; } = new List<Prescription>();

        public virtual ICollection<MedicalRecord> MedicalRecords { get; set; } = new List<MedicalRecord>();
    }
}
