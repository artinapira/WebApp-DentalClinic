namespace WebApp_DentalClinic.ViewModels
{
    public class AdminVM
    {
        public string EmriMbiemri { get; set; } = null!;

        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; } = string.Empty;

        public int DepartmentId { get; set; }
    }
}
