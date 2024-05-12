using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Services
{
    public class KnowledgeServices
    {
        private AppDbContext _context;
        public KnowledgeServices(AppDbContext context)
        {
            _context = context;
        }

        public void AddKnowledge(KnowledgeVM knowledge)
        {
            var _knowledge= new Knowledge()
            {
                Pershkrimi = knowledge.Pershkrimi,

            };
            _context.Knowledges.Add(_knowledge);
            _context.SaveChanges();
        }

        public List<Knowledge> GetAllKnowledge()
        {
            var allknowledge = _context.Knowledges.ToList();
            return allknowledge;
        }

        public Knowledge GetKnowledgeById(int knowledgeId) => _context.Knowledges.FirstOrDefault(n => n.KnowledgeId == knowledgeId);

        public Knowledge UpdateKnowledgeById(int knowledgeId, KnowledgeVM knowledge)
        {
            var _knowledge = _context.Knowledges.FirstOrDefault(n => n.KnowledgeId == knowledgeId);
            if (_knowledge != null)
            {
                _knowledge.Pershkrimi = knowledge.Pershkrimi;


                _context.SaveChanges();
            }
            return _knowledge;
        }

        public void DeleteKnowledgeById(int knowledgeId)
        {
            var _knowledge = _context.Knowledges.FirstOrDefault(n => n.KnowledgeId == knowledgeId);
            if (_knowledge != null)
            {
                _context.Knowledges.Remove(_knowledge);
                _context.SaveChanges();
            }
        }
    }
}
