using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.Services;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientNoteController : ControllerBase
    {
        public PatientNoteServices _patientNoteService;

        public PatientNoteController(PatientNoteServices patientNoteService)
        {
            _patientNoteService = patientNoteService;
        }

        [HttpPost("add-patientNote")]
        public IActionResult AddPatientNote([FromBody] PatientNoteVM patientNote)
        {
            _patientNoteService.AddPatientNote(patientNote);
            return Ok();
        }

        [HttpGet("get-all-patientNote")]
        public IActionResult GetAllPatientNote()
        {
            var allPatientNote = _patientNoteService.GetAllPatientNote();
            return Ok(allPatientNote);
        }

        [HttpGet("get-patientNote-by-id/{id}")]
        public IActionResult GetPatientNoteById(int id)
        {
            var patientNote = _patientNoteService.GetPatientNoteById(id);
            return Ok(patientNote);
        }

        [HttpPut("update-patientNote-by-id/{id}")]
        public IActionResult UpdatePatientNoteById(int id, [FromBody] PatientNoteVM patientNote)
        {
            var updatedPatientNote = _patientNoteService.UpdatePatientNoteById(id, patientNote);
            return Ok(updatedPatientNote);
        }

        [HttpDelete("delete-patientNote-by-id/{id}")]
        public IActionResult DeletePatientNoteById(int id)
        {
            _patientNoteService.DeletePatientNoteById(id);
            return Ok();
        }
    }
}
