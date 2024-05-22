namespace WebApp_DentalClinic.Models
{
    public class MedicalRecord
    {
        public int MedicalRecordId { get; set; }

        public string Pershkrimi { get; set; } = null!;

        public string Simptomat { get; set; } = null!;

        public string Diagnoza { get; set; } = null!;

        public string Rezultati { get; set; } = null!;

        public int PatientId { get; set; }

        public virtual Patient Patient { get; set; } = null!;

        public virtual ICollection<Terapia> Terapias { get; set; } = new List<Terapia>();
    }
}
