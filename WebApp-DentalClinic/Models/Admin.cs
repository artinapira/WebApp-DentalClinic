namespace WebApp_DentalClinic.Models
{
    public class Admin
    {
        public int AdminId { get; set; }

        public string EmriMbiemri { get; set; } = null!;

        public int UserId { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
