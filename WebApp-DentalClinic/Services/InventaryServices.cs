using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Services
{
    public class InventaryServices
    {
        private AppDbContext _context;
        public InventaryServices(AppDbContext context)
        {
            _context = context;
        }

        public void AddInventari(InventaryVM inventari)
        {
            var _inventari = new Inventary()
            {
                Emri = inventari.Emri

            };
            _context.Inventaries.Add(_inventari);
            _context.SaveChanges();
        }

        public List<Inventary> GetAllInventary()
        {
            var allinventarys = _context.Inventaries.ToList();
            return allinventarys;
        }

        public Inventary GetItemById(int itemId) => _context.Inventaries.FirstOrDefault(n => n.ItemID == itemId);

        public Inventary UpdateItemById(int itemId, InventaryVM inventari)
        {
            var _inventari = _context.Inventaries.FirstOrDefault(n => n.ItemID == itemId);
            if (_inventari != null)
            {
                _inventari.Emri = inventari.Emri;
               

                _context.SaveChanges();
            }
            return _inventari;
        }

        public void DeleteItemById(int itemId)
        {
            var _inventari = _context.Inventaries.FirstOrDefault(n => n.ItemID == itemId);
            if (_inventari != null)
            {
                _context.Inventaries.Remove(_inventari);
                _context.SaveChanges();
            }
        }
    }
}

