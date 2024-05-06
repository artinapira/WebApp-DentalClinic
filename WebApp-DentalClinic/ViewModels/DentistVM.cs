namespace WebApp_DentalClinic.ViewModels
{
    public class DentistVM
    {
        public string EmriMbiemri { get; set; } = null!;

        public string Degree { get; set; } = null!;

        public TimeOnly? Orari { get; set; }

        public decimal Paga { get; set; }

        public int DepartmentId { get; set; }

    }
}
