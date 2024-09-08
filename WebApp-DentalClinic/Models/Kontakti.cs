using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApp_DentalClinic.Models
{
    public class Kontakti
    {
        [Key]
        [Column("KontaktiID")]
        public int KontaktiId { get; set; }

        [Unicode(false)]
        public string Mesazhi { get; set; } = null!;

        [StringLength(50)]
        [Unicode(false)]
        public string Emri { get; set; } = null!;

        [StringLength(255)]
        [Unicode(false)]
        public string Email { get; set; } = null!;
    }
}
