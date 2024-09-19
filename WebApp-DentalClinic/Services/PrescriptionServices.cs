using Microsoft.EntityFrameworkCore;
using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Services
{
    public class PrescriptionServices
    {
        private AppDbContext _context;
        public PrescriptionServices(AppDbContext context)
        {
            _context = context;
        }

        public void AddPrescription(PrescriptionVM prescription)
        {
            var _prescription = new Prescription()
            {
                Diagnoza = prescription.Diagnoza,
                Medicina = prescription.Medicina,
                PatientId = prescription.PatientId

            };
            _context.Prescriptions.Add(_prescription);
            _context.SaveChanges();
        }

        public List<Prescription> GetAllPrescription()
        {
            var allprescription = _context.Prescriptions.ToList();
            return allprescription;
        }

        public Prescription GetPrescriptionById(int prescriptionId) => _context.Prescriptions.FirstOrDefault(n => n.PrescriptionId == prescriptionId);

        public Prescription UpdatePrescriptionById(int prescriptionId, PrescriptionVM prescription)
        {
            var _prescription = _context.Prescriptions.FirstOrDefault(n => n.PrescriptionId == prescriptionId);
            if (_prescription != null)
            {
                _prescription.Diagnoza = prescription.Diagnoza;
                _prescription.Medicina = prescription.Medicina;

                _context.SaveChanges();
            }
            return _prescription;
        }

        public void DeletePrescriptionById(int prescriptionId)
        {
            var _prescription = _context.Prescriptions.FirstOrDefault(n => n.PrescriptionId == prescriptionId);
            if (_prescription != null)
            {
                _context.Prescriptions.Remove(_prescription);
                _context.SaveChanges();
            }
        }
    }
}
