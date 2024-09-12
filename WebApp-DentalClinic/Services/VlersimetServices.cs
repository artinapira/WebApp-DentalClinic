using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Services
{
    public class VlersimetServices
    {
        private AppDbContext _context;
        public VlersimetServices(AppDbContext context)
        {
            _context = context;
        }

        public void AddVlersimi(VlersimetVM vlersimi)
        {
            var _vlersimi = new Vlersimet()
            {
                Sherbimi = vlersimi.Sherbimi,
                Sjellja = vlersimi.Sjellja,
                DentistId = vlersimi.DentistId,
                PatientId = vlersimi.PatientId,


            };
            _context.Vlersimett.Add(_vlersimi);
            _context.SaveChanges();
        }

        public List<Vlersimet> GetAllVlersimet()
        {
            var allvlersimet = _context.Vlersimett.ToList();
            return allvlersimet;
        }

        public Vlersimet GetVlersimetById(int vlersimiId) => _context.Vlersimett.FirstOrDefault(n => n.VlersimetId == vlersimiId);

        public Vlersimet UpdateVlersimetById(int vlersimiId, VlersimetVM vlersimi)
        {
            var _vlersimi = _context.Vlersimett.FirstOrDefault(n => n.VlersimetId == vlersimiId);
            if (_vlersimi != null)
            {
                _vlersimi.Sherbimi = vlersimi.Sherbimi;
                _vlersimi.Sjellja = vlersimi.Sjellja;
                _vlersimi.PatientId = vlersimi.PatientId;
                _vlersimi.DentistId = vlersimi.DentistId;

                _context.SaveChanges();
            }
            return _vlersimi;
        }

        public void DeleteVlersimetById(int vlersimetId)
        {
            var _vlersimet = _context.Vlersimett.FirstOrDefault(n => n.VlersimetId == vlersimetId);
            if (_vlersimet != null)
            {
                _context.Vlersimett.Remove(_vlersimet);
                _context.SaveChanges();
            }
        }
    }
}
