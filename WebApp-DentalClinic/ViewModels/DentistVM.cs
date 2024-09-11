namespace WebApp_DentalClinic.ViewModels
{
    public class DentistVM
    {
        public string EmriMbiemri { get; set; } = null!;

        public string Degree { get; set; } = null!;

        public TimeOnly? Orari { get; set; }

        public decimal Paga { get; set; }

        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; } = string.Empty;

        public int DepartmentId { get; set; }

    }
}
