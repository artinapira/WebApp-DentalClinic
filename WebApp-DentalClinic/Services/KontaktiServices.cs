using Microsoft.EntityFrameworkCore;
using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Services
{
    public class KontaktiServices
    {
        private AppDbContext _context;
        public KontaktiServices(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ServiceResponse<string>> AddKontakti(KontaktiVM kontakti)
        {
            var response = new ServiceResponse<string>();

            try
            {
                var _kontakti = new Kontakti
                {
                    Mesazhi = kontakti.Mesazhi,
                    PatientId = kontakti.PatientId,
                };

                _context.Kontaktis.Add(_kontakti);
                await _context.SaveChangesAsync();

                response.Success = true;
                response.Message = "Contact message added successfully.";
                response.Data = "Message ID or any other relevant data"; // Optionally, you can return some data here.
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = $"An error occurred: {ex.Message}";
            }

            return response;
        }


        public List<Kontakti> GetAllKontakti()
        {
            return _context.Kontaktis.ToList();
        }

        public Kontakti GetSingleKontakti(int kontaktiid) => _context.Kontaktis.FirstOrDefault(n => n.KontaktiId == kontaktiid);

        public Kontakti UpdateKontaktiById(int kontaktiId, KontaktiVM kontakti)
        {
            var _kontakti = _context.Kontaktis.FirstOrDefault(n => n.KontaktiId == kontaktiId);
            if (_kontakti != null)
            {
                _kontakti.Mesazhi = kontakti.Mesazhi;
                _kontakti.PatientId = kontakti.PatientId;
                _context.SaveChanges();
            }
            return _kontakti;
        }

        public void DeleteKontakti(int kontaktiId)
        {
            var _kontakti = _context.Kontaktis.FirstOrDefault(n => n.KontaktiId == kontaktiId);
            if (_kontakti != null)
            {
                _context.Kontaktis.Remove(_kontakti);
                _context.SaveChanges();
            }
        }
    }
}
