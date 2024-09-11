namespace WebApp_DentalClinic.ViewModels
{
    public class PatientVM
    {
        public string EmriMbiemri { get; set; } = null!;

        public DateOnly? DataLindjes { get; set; }

        public string? Gjinia { get; set; }

        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; } = string.Empty;
    }
}
