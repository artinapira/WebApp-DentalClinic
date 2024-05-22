using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp_DentalClinic.Services;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrescriptionController : ControllerBase
    {
        public PrescriptionServices _prescriptionService;

        public PrescriptionController(PrescriptionServices prescriptionService)
        {
            _prescriptionService = prescriptionService;
        }

        [HttpPost("add-prescription")]
        public IActionResult AddPrescription([FromBody] PrescriptionVM prescription)
        {
            _prescriptionService.AddPrescription(prescription);
            return Ok();
        }

        [HttpGet("get-all-prescriptions")]
        public IActionResult GetAllPrescription()
        {
            var allPrescription = _prescriptionService.GetAllPrescription();
            return Ok(allPrescription);
        }

        [HttpGet("get-prescriptions-by-id/{id}")]
        public IActionResult GetPrescriptionById(int id)
        {
            var prescription = _prescriptionService.GetPrescriptionById(id);
            return Ok(prescription);
        }

        [HttpPut("update-prescription-by-id/{id}")]
        public IActionResult UpdatePrescriptionById(int id, [FromBody] PrescriptionVM prescription)
        {
            var updatedPrescription = _prescriptionService.UpdatePrescriptionById(id, prescription);
            return Ok(updatedPrescription);
        }

        [HttpDelete("delete-prescription-by-id/{id}")]
        public IActionResult DeletePrescriptionById(int id)
        {
            _prescriptionService.DeletePrescriptionById(id);
            return Ok();
        }
    }
}
