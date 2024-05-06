namespace WebApp_DentalClinic.Models
{
    public class Terminet
    {
        public int TerminetId { get; set; }

        public DateOnly? DataT { get; set; }

        public TimeOnly? Ora { get; set; }

        public string Ceshtja { get; set; } = null!;

        public int DentistId { get; set; }

        public int PatientId { get; set; }

        public virtual Patient Patient { get; set; } = null!;

        public virtual Dentist Dentist { get; set; } = null!;
    }
}
