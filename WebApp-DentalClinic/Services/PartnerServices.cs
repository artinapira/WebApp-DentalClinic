using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Services
{
    public class PartnerServices
    {
        private AppDbContext _context;
        public PartnerServices(AppDbContext context)
        {
            _context = context;
        }

        public void AddPartner(PartnerVM partner)
        {
            var _partner = new Partner()
            {
                Emri = partner.Emri,
                Pershkrimi = partner.Pershkrimi,

            };
            _context.Partners.Add(_partner);
            _context.SaveChanges();
        }

        public List<Partner> GetAllPartners()
        {
            var allpartners = _context.Partners.ToList();
            return allpartners;
        }

        public Partner GetPartnersById(int partnerId) => _context.Partners.FirstOrDefault(n => n.PartnerId == partnerId);

        public Partner UpdatePartnerById(int partnerId, PartnerVM partner)
        {
            var _partner = _context.Partners.FirstOrDefault(n => n.PartnerId== partnerId);
            if (_partner != null)
            {
                _partner.Emri = partner.Emri;
                _partner.Pershkrimi = partner.Pershkrimi;


                _context.SaveChanges();
            }
            return _partner;
        }

        public void DeletePartnerById(int partnerId)
        {
            var _partner = _context.Partners.FirstOrDefault(n => n.PartnerId == partnerId);
            if (_partner != null)
            {
                _context.Partners.Remove(_partner);
                _context.SaveChanges();
            }
        }
    }
}
