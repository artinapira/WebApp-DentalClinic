namespace WebApp_DentalClinic.ViewModels
{
    public class MedicalRecordVM
    {
        public string Pershkrimi { get; set; } = null!;

        public string Simptomat { get; set; } = null!;

        public string Diagnoza { get; set; } = null!;

        public string Rezultati { get; set; } = null!;

        public int PatientId { get; set; }
    }
}
