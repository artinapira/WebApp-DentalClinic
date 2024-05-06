namespace WebApp_DentalClinic.Models
{
    public class Patient
    {
        public int PatientId { get; set; }

        public string EmriMbiemri { get; set; } = null!;

        public DateOnly? DataLindjes { get; set; }

        public string? Gjinia { get; set; }

        public int UserId { get; set; }

        public virtual User User { get; set; } = null!;

        public virtual ICollection<Terminet> Terminets { get; set; } = new List<Terminet>();
    }
}
