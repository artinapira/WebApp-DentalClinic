namespace WebApp_DentalClinic.Models
{
    public class Marketing
    {
        public int MarketingId { get; set; }

        public byte[]? Img { get; set; }

        public string Pershkrimi { get; set; } = null!;

        public virtual ICollection<SherbimeShtese> SherbimeShteses { get; set; } = new List<SherbimeShtese>();

        public virtual ICollection<Dentist> Dentists { get; set; } = new List<Dentist>();
    }
}
