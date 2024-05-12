namespace WebApp_DentalClinic.Models
{
    public class Knowledge
    {
        public int KnowledgeId { get; set; }

        public string Pershkrimi { get; set; } = null!;

        public virtual ICollection<Partner> Partners { get; set; } = new List<Partner>();

        public virtual ICollection<Dentist> Dentists { get; set; } = new List<Dentist>();
    }

}

