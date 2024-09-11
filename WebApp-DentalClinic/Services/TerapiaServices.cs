using Microsoft.EntityFrameworkCore;
using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Services
{
    public class TerapiaServices
    {
        private AppDbContext _context;
        public TerapiaServices(AppDbContext context)
        {
            _context = context;
        }

        public void AddTerapia(TerapiaVM terapia)
        {
            var _terapia = new Terapia()
            {
                Emri = terapia.Emri,
                Pershkrimi = terapia.Pershkrimi,

            };
            _context.Terapias.Add(_terapia);
            _context.SaveChanges();
        }

        public List<Terapia> GetAllTerapia()
        {
            var allTerapia = _context.Terapias.ToList();
            return allTerapia;
        }

        public Terapia GetTerapiaById(int terapiaId) => _context.Terapias.FirstOrDefault(n => n.TerapiaId == terapiaId);

        public Terapia UpdateTerapiaById(int terapiaId, TerapiaVM terapia)
        {
            var _terapia = _context.Terapias.FirstOrDefault(n => n.TerapiaId == terapiaId);
            if (_terapia != null)
            {
                _terapia.Emri = terapia.Emri;
                _terapia.Pershkrimi = terapia.Pershkrimi;

                _context.SaveChanges();
            }
            return _terapia;
        }

        public void DeleteTerapiaById(int terapiaId)
        {
            var _terapia = _context.Terapias.FirstOrDefault(n => n.TerapiaId == terapiaId);
            if (_terapia != null)
            {
                _context.Terapias.Remove(_terapia);
                _context.SaveChanges();
            }
        }
    }
}
