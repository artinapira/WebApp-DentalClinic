namespace WebApp_DentalClinic.Models
{
    public class Admin
    {
        public int AdminId { get; set; }

        public string EmriMbiemri { get; set; } = null!;


        public string Username { get; set; }
        public string Email { get; set; }

        public int DepartmentId { get; set; }
        public byte[] PasswordHash { get; set; } = null!;
        public byte[] PasswordSalt { get; set; } = null!;

        public string RefreshToken { get; set; } = null!;
        public DateTime RefreshTokenExpiryTime { get; set; }

        public virtual Department Department { get; set; } = null!;
    }
}
