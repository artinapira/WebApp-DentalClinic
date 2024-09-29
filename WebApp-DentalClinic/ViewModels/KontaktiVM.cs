using Microsoft.EntityFrameworkCore;

namespace WebApp_DentalClinic.ViewModels
{
    public class KontaktiVM
    {
        [Unicode(false)]
        public string Mesazhi { get; set; } = null!;

        public int PatientId { get; set; }
    }
}
