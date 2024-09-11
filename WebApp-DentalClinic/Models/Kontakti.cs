using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp_DentalClinic.Models
{
    public class Kontakti
    {
        [Key]
        [Column("KontaktiID")]
        public int KontaktiId { get; set; }

        [Unicode(false)]
        public string Mesazhi { get; set; } = null!;

        // Remove Email and any other unwanted fields
    }
}
