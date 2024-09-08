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
        public void AddKontakti(KontaktiVM kontakti)
        {
            var _kontakti = new Kontakti()
            {
                Mesazhi = kontakti.Mesazhi,
            };
            _context.Kontaktis.Add(_kontakti);
            _context.SaveChanges();
        }

        public List<Kontakti> GetAllKontakti()
        {
            var allkontakti = _context.Kontaktis.ToList();
            return allkontakti;
        }

        public Kontakti GetSingleKontakti(int kontaktiid) => _context.Kontaktis.FirstOrDefault(n => n.KontaktiId == kontaktiid);

        public Kontakti UpdateKontaktiById(int kontaktiId, KontaktiVM kontakti)
        {
            var _kontakti = _context.Kontaktis.FirstOrDefault(n => n.KontaktiId == kontaktiId);
            if (_kontakti != null)
            {
                _kontakti.Mesazhi = kontakti.Mesazhi;

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
