namespace WebApp_DentalClinic.Models
{
    public class Ankesat
    {
        public int AnkesatId { get; set; }

        public string Ankesa { get; set; } = null!;

        public int DentistId { get; set; }

        public int PatientId { get; set; }

        public virtual Patient Patient { get; set; } = null!;

        public virtual Dentist Dentist { get; set; } = null!;
    }
}
