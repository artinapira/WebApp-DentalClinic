namespace WebApp_DentalClinic.Models
{
    public class Admin
    {
        public int AdminId { get; set; }

        public string EmriMbiemri { get; set; } = null!;


        public string Username { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; } = null!;
        public byte[] PasswordSalt { get; set; } = null!;
    }
}
