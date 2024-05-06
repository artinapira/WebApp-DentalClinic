using System.Security.Principal;

namespace WebApp_DentalClinic.ViewModels
{
    public class UserVM
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; } = string.Empty;
    }
}
