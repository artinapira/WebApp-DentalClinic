namespace WebApp_DentalClinic.Models
{
    public class Dentist
    {
        public int DentistId { get; set; }

        public string EmriMbiemri { get; set; } = null!;

        public string Degree { get; set; } = null!;

        public TimeOnly? Orari { get; set; }

        public decimal Paga { get; set; }

        public int DepartmentId { get; set; }

        public int UserId { get; set; }

        public virtual User User { get; set; } = null!;

        public virtual Department Department { get; set; } = null!;

        public virtual ICollection<Terminet> Terminets { get; set; } = new List<Terminet>();

        public virtual ICollection<Ankesat> Ankesats { get; set; } = new List<Ankesat>();

        public virtual ICollection<Vlersimet> Vlersimets { get; set; } = new List<Vlersimet>();

        public virtual ICollection<Inventary> Inventories { get; set; } = new List<Inventary>();

        public virtual ICollection<Knowledge> Knowledges { get; set; } = new List<Knowledge>();

        public virtual ICollection<Marketing> Marketings { get; set; } = new List<Marketing>();
    }
}
