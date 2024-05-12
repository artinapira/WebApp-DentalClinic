namespace WebApp_DentalClinic.Models
{
    public class Partner
    {
        public int PartnerId { get; set; }

        public string Emri { get; set; } = null!;

        public string Pershkrimi { get; set; } = null!;

        public virtual ICollection<Knowledge> Knowledges { get; set; } = new List<Knowledge>();
    }

}

