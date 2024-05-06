namespace WebApp_DentalClinic.Models
{
    public class Department
    {
        public int DepartmentId { get; set; }

        public string Emri { get; set; } = null!;

        public string Pershkrimi { get; set; } = null!;

        public virtual ICollection<Dentist> Dentists { get; set; } = new List<Dentist>();
    }
}
