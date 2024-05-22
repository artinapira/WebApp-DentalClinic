namespace WebApp_DentalClinic.ViewModels
{
    public class PrescriptionVM
    {
        public string Diagnoza { get; set; } = null!;

        public string Medicina { get; set; } = null!;

        public int PatientId { get; set; }
    }
}
