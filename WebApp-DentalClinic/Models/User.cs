namespace WebApp_DentalClinic.Models
{
    public enum Role
    {
        Admin,
        Dentist,
        Patient
    }
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; } = null!;
        public byte[] PasswordSalt { get; set; } = null!;
        public Role UserRole { get; set; }

        public virtual ICollection<Patient> Patients { get; set; } = new List<Patient>();

        public virtual ICollection<Dentist> Dentists { get; set; } = new List<Dentist>();
    }
}
