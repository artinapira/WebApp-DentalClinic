namespace WebApp_DentalClinic.Models
{
    public class Inventary
    {
        public int ItemID { get; set; }

        public string Emri { get; set; } = null!;

        public virtual ICollection<Dentist> Dentists { get; set; } = new List<Dentist>();


    }
}
