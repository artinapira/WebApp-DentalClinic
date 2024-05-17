namespace WebApp_DentalClinic.Models
{
    public class SherbimeShtese
    {
        public int SherbimeShteseId { get; set; }

        public string Emri { get; set; } = null!;

        public string Pershkrimi { get; set; } = null!;

        public decimal? Cmimi { get; set; }

        public virtual ICollection<Marketing> Marketings { get; set; } = new List<Marketing>();
    }
}
