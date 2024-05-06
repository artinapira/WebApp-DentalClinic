namespace WebApp_DentalClinic.ViewModels
{
    public class TerminetVM
    {
        public DateOnly? DataT { get; set; }

        public TimeOnly? Ora { get; set; }

        public string Ceshtja { get; set; } = null!;

        public int StafiId { get; set; }

        public int PacientiId { get; set; }
    }
}
