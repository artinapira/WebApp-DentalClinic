namespace WebApp_DentalClinic.Models
{
    public class PatientNote
    {
        public int PatientNoteId { get; set; }

        public string Pershkrimi { get; set; } = null!;

        public int PatientId { get; set; }

        public virtual Patient Patient { get; set; } = null!;
    }
}
