namespace WebApp_DentalClinic.Models
{
    public class Prescription
    {
        public int PrescriptionId { get; set; }

        public string Diagnoza { get; set; } = null!;

        public string Medicina { get; set; } = null!;

        public int PatientId { get; set; }

        public virtual Patient Patient { get; set; } = null!;

        public virtual ICollection<Terapia> Terapias { get; set; } = new List<Terapia>();
    }
}
