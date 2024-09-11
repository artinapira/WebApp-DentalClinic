using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.ViewModels;
using Microsoft.EntityFrameworkCore;


namespace WebApp_DentalClinic.Services
{
    public class MedicalRecordServices
    {
        private AppDbContext _context;
        public MedicalRecordServices(AppDbContext context)
        {
            _context = context;
        }

        public void AddMedicalRecord(MedicalRecordVM medicalRecord)
        {
            var _medicalRecord = new MedicalRecord()
            {
                Pershkrimi = medicalRecord.Pershkrimi,
                Simptomat = medicalRecord.Simptomat,
                Diagnoza = medicalRecord.Diagnoza,
                Rezultati = medicalRecord.Rezultati,
                PatientId = medicalRecord.PatientId

            };
            _context.MedicalRecords.Add(_medicalRecord);
            _context.SaveChanges();
        }

        public List<MedicalRecordVM> GetAllMedicalRecord()
        {
            var allMedicalRecords = _context.MedicalRecords
                .Include(m => m.Patient)
                .Include(m => m.Terapias)
                .Select(mr => new MedicalRecordVM
                {
                    Pershkrimi = mr.Pershkrimi,
                    Simptomat = mr.Simptomat,
                    Diagnoza = mr.Diagnoza,
                    Rezultati = mr.Rezultati,
                    PatientId = mr.Patient.PatientId,
                })
                .ToList();

            return allMedicalRecords;
        }

        public MedicalRecord GetMedicalRecordById(int medicalRecordId) => _context.MedicalRecords.FirstOrDefault(n => n.MedicalRecordId == medicalRecordId);

        public MedicalRecord UpdateMedicalRecordById(int medicalRecordId, MedicalRecordVM medicalRecord)
        {
            var _medicalRecord = _context.MedicalRecords.FirstOrDefault(n => n.MedicalRecordId == medicalRecordId);
            if (_medicalRecord != null)
            {
                _medicalRecord.Pershkrimi = medicalRecord.Pershkrimi;
                _medicalRecord.Simptomat = medicalRecord.Simptomat;
                _medicalRecord.Diagnoza = medicalRecord.Diagnoza;
                _medicalRecord.Rezultati = medicalRecord.Rezultati;
                _medicalRecord.PatientId = medicalRecord.PatientId;

                _context.SaveChanges();
            }
            return _medicalRecord;
        }

        public void DeleteMedicalRecordById(int medicalRecordId)
        {
            var _medicalRecord = _context.MedicalRecords.FirstOrDefault(n => n.MedicalRecordId == medicalRecordId);
            if (_medicalRecord != null)
            {
                _context.MedicalRecords.Remove(_medicalRecord);
                _context.SaveChanges();
            }
        }
    }
}
