using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Services
{
    public class AnkesatServices
    {
        private AppDbContext _context;
        public AnkesatServices(AppDbContext context)
        {
            _context = context;
        }

        public void AddAnkesat(AnkesatVM ankesat)
        {
            var _ankesat = new Ankesat()
            {
                Ankesa = ankesat.Ankesa,
                DentistId = ankesat.DentistId,
                PatientId = ankesat.PatientId

            };
            _context.Ankesats.Add(_ankesat);
            _context.SaveChanges();
        }

        public List<Ankesat> GetAllAnkesat()
        {
            var allAnkesat = _context.Ankesats.ToList();
            return allAnkesat;
        }

        public Ankesat GetAnkesatById(int ankesatId) => _context.Ankesats.FirstOrDefault(n => n.AnkesatId == ankesatId);

        public Ankesat UpdateAnkesatById(int ankesatId, AnkesatVM ankesat)
        {
            var _ankesat = _context.Ankesats.FirstOrDefault(n => n.AnkesatId == ankesatId);
            if (_ankesat != null)
            {
                _ankesat.Ankesa = ankesat.Ankesa;
                _ankesat.DentistId = ankesat.DentistId;
                _ankesat.PatientId = ankesat.PatientId;

                _context.SaveChanges();
            }
            return _ankesat;
        }

        public void DeleteAnkesatById(int ankesatId)
        {
            var _ankesat = _context.Ankesats.FirstOrDefault(n => n.AnkesatId == ankesatId);
            if (_ankesat != null)
            {
                _context.Ankesats.Remove(_ankesat);
                _context.SaveChanges();
            }
        }
    }
}
