namespace WebApp_DentalClinic.Models
{
    public class Vlersimet
    {
        public int VlersimetId { get; set; }
        public string Sherbimi { get; set; }
        public string Sjellja { get; set; }
        public int DentistId { get; set; }
        public int PatientId { get; set; }
        public virtual Patient Patient { get; set; } = null!;

        public virtual Dentist Dentist { get; set; } = null!;
    }
}
