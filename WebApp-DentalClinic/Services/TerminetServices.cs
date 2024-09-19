using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Services
{
    public class TerminetServices
    {
        private AppDbContext _context;
        public TerminetServices(AppDbContext context)
        {
            _context = context;
        }

        public void AddTermini(TerminetVM termini)
        {
            var _termini = new Terminet()
            {
                DataT = termini.DataT,
                Ora = termini.Ora,
                Ceshtja = termini.Ceshtja,
                DentistId = termini.DentistId,
                PatientId = termini.PatientId

            };
            _context.Terminets.Add(_termini);
            _context.SaveChanges();
        }

        public List<Terminet> GetAllTerminet()
        {
            var allterminet = _context.Terminets.ToList();
            return allterminet;
        }

        public Terminet GetTerminetById(int terminiId) => _context.Terminets.FirstOrDefault(n => n.TerminetId == terminiId);

        public Terminet UpdateTerminetById(int terminiId, TerminetVM termini)
        {
            var _termini = _context.Terminets.FirstOrDefault(n => n.TerminetId == terminiId);
            if (_termini != null)
            {
                _termini.DataT = termini.DataT;
                _termini.Ora = termini.Ora;
                _termini.Ceshtja = termini.Ceshtja;
                _termini.DentistId = termini.DentistId;
                _termini.PatientId = termini.PatientId;

                _context.SaveChanges();
            }
            return _termini;
        }

        public void DeleteTerminetById(int terminetId)
        {
            var _terminet = _context.Terminets.FirstOrDefault(n => n.TerminetId == terminetId);
            if (_terminet != null)
            {
                _context.Terminets.Remove(_terminet);
                _context.SaveChanges();
            }
        }
    }
}
