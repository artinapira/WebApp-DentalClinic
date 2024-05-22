using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.Services;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicalRecordController : ControllerBase
    {
        public MedicalRecordServices _medicalRecordService;

        public MedicalRecordController(MedicalRecordServices medicalRecordService)
        {
            _medicalRecordService = medicalRecordService;
        }

        [HttpPost("add-medicalRecord")]
        public IActionResult AddMedicalRecord([FromBody] MedicalRecordVM medicalRecord)
        {
            _medicalRecordService.AddMedicalRecord(medicalRecord);
            return Ok();
        }

        [HttpGet("get-all-medicalRecord")]
        public IActionResult GetAllMedicalRecord()
        {
            var allmedicalRecord = _medicalRecordService.GetAllMedicalRecord();
            return Ok(allmedicalRecord);
        }

        [HttpGet("get-medicalRecord-by-id/{id}")]
        public IActionResult GetMedicalRecordById(int id)
        {
            var medicalRecord = _medicalRecordService.GetMedicalRecordById(id);
            return Ok(medicalRecord);
        }

        [HttpPut("update-medicalRecord-by-id/{id}")]
        public IActionResult UpdateMedicalRecordById(int id, [FromBody] MedicalRecordVM medicalRecord)
        {
            var updatedMedicalRecord = _medicalRecordService.UpdateMedicalRecordById(id, medicalRecord);
            return Ok(updatedMedicalRecord);
        }

        [HttpDelete("delete-medicalRecord-by-id/{id}")]
        public IActionResult DeleteMedicalRecordById(int id)
        {
            _medicalRecordService.DeleteMedicalRecordById(id);
            return Ok();
        }
    }
}
