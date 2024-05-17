using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Services
{
    public class SherbimeShteseServices
    {
        private AppDbContext _context;
        public SherbimeShteseServices(AppDbContext context)
        {
            _context = context;
        }

        public void AddSherbimeShtese(SherbimeShteseVM sherbimeShtese)
        {
            var _sherbimeShtese = new SherbimeShtese()
            {
                Emri = sherbimeShtese.Emri,
                Pershkrimi = sherbimeShtese.Pershkrimi,
                Cmimi = sherbimeShtese.Cmimi,
            };
            _context.SherbimeShteses.Add(_sherbimeShtese);
            _context.SaveChanges();
        }

        public List<SherbimeShtese> GetAllSherbimeShtese()
        {
            var allsherbimeShtese = _context.SherbimeShteses.ToList();
            return allsherbimeShtese;
        }

        public SherbimeShtese GetSherbimeShteseById(int sherbimeShteseId) => _context.SherbimeShteses.FirstOrDefault(n => n.SherbimeShteseId == sherbimeShteseId);

        public SherbimeShtese UpdateSherbimeShteseById(int sherbimeShteseId, SherbimeShteseVM sherbimeShtese)
        {
            var _sherbimeShtese = _context.SherbimeShteses.FirstOrDefault(n => n.SherbimeShteseId == sherbimeShteseId);
            if (_sherbimeShtese != null)
            {
                _sherbimeShtese.Emri = sherbimeShtese.Emri;
                _sherbimeShtese.Pershkrimi = sherbimeShtese.Pershkrimi;
                _sherbimeShtese.Cmimi = sherbimeShtese.Cmimi;

                _context.SaveChanges();
            }
            return _sherbimeShtese;
        }

        public void DeleteSherbimeShteseById(int sherbimeShteseId)
        {
            var _sherbimeShtese = _context.SherbimeShteses.FirstOrDefault(n => n.SherbimeShteseId == sherbimeShteseId);
            if (_sherbimeShtese != null)
            {
                _context.SherbimeShteses.Remove(_sherbimeShtese);
                _context.SaveChanges();
            }
        }
    }
}
