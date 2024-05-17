using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Services
{
    public class PatientNoteServices
    {
        private AppDbContext _context;
        public PatientNoteServices(AppDbContext context)
        {
            _context = context;
        }

        public void AddPatientNote(PatientNoteVM patientNote)
        {
            var _patientNote = new PatientNote()
            {
                Pershkrimi = patientNote.Pershkrimi,
                PatientId = patientNote.PatientId,
            };
            _context.PatientNotes.Add(_patientNote);
            _context.SaveChanges();
        }

        public List<PatientNote> GetAllPatientNote()
        {
            var allpatientNote = _context.PatientNotes.ToList();
            return allpatientNote;
        }

        public PatientNote GetPatientNoteById(int patientNoteId) => _context.PatientNotes.FirstOrDefault(n => n.PatientNoteId == patientNoteId);

        public PatientNote UpdatePatientNoteById(int patientNoteId, PatientNoteVM patientNote)
        {
            var _patientNote = _context.PatientNotes.FirstOrDefault(n => n.PatientNoteId == patientNoteId);
            if (_patientNote != null)
            {
                _patientNote.Pershkrimi = patientNote.Pershkrimi;
                _patientNote.PatientId = patientNote.PatientId;

                _context.SaveChanges();
            }
            return _patientNote;
        }

        public void DeletePatientNoteById(int patientNoteId)
        {
            var _patientNote = _context.PatientNotes.FirstOrDefault(n => n.PatientNoteId == patientNoteId);
            if (_patientNote != null)
            {
                _context.PatientNotes.Remove(_patientNote);
                _context.SaveChanges();
            }
        }
    }
}
