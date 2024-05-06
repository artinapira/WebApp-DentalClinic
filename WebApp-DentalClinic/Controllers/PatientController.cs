using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.Services;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        public PatientServices _patientServices;

        public PatientController(PatientServices patientServices)
        {
            _patientServices = patientServices;
        }

        [Authorize(Roles = "Patient,Admin")]
        [HttpGet("/PatientAll")]
        public async Task<ActionResult<List<Patient>>> GetAllPatients()
        {
            var result = await _patientServices.GetAllPatients();
            if (result == null)
            {
                return NotFound("Patient not found");
            }
            return Ok(result);
        }

        [Authorize(Roles = "Patient")]
        [HttpGet("/patientProfile")]
        public async Task<ActionResult<Patient>> GetPatientProfile()
        {
            int id = int.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)!.Value);

            return await _patientServices.GetSinglePatient(id);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetSinglePatient(int id)
        {
            var result = await _patientServices.GetSinglePatient(id);
            if (result == null)
            {
                return NotFound("Patient not found");
            }
            return Ok(result);
        }

        [Authorize(Roles = "Patient,Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<List<Patient>>> UpdatePatient(int id, PatientVM patient)
        {
            var result = await _patientServices.UpdatePatient(id, patient);

            if (result == null)
            {
                return NotFound("Patient not found");
            }
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Patient>>> DeletePatient(int id)
        {
            var result = await _patientServices.DeletePatient(id);
            if (result == null) return NotFound("Patient not found");
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<ActionResult<List<Patient>>> Login(Login request)
        {
            var response = await _patientServices.Login(request.Email, request.Password);
            if (!(bool)response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}
