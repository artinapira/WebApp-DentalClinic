using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Services
{
    public class MarketingServices
    {
        private AppDbContext _context;
        public MarketingServices(AppDbContext context)
        {
            _context = context;
        }

        public void AddMarketing(MarketingVM marketing)
        {
            var _marketing = new Marketing()
            {
                Img = marketing.Img,
                Pershkrimi = marketing.Pershkrimi
            };
            _context.Marketings.Add(_marketing);
            _context.SaveChanges();
        }

        public List<Marketing> GetAllMarketing()
        {
            var allmarketing = _context.Marketings.ToList();
            return allmarketing;
        }

        public Marketing GetMarketingById(int marketingId) => _context.Marketings.FirstOrDefault(n => n.MarketingId == marketingId);

        public Marketing UpdateMarketingById(int marketingId, MarketingVM marketing)
        {
            var _marketing = _context.Marketings.FirstOrDefault(n => n.MarketingId == marketingId);
            if (_marketing != null)
            {
                _marketing.Img = marketing.Img;
                _marketing.Pershkrimi = marketing.Pershkrimi;

                _context.SaveChanges();
            }
            return _marketing;
        }

        public void DeleteMarketingById(int marketingId)
        {
            var _marketing = _context.Marketings.FirstOrDefault(n => n.MarketingId == marketingId);
            if (_marketing != null)
            {
                _context.Marketings.Remove(_marketing);
                _context.SaveChanges();
            }
        }
    }
}
