using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        private AppDbContext _context;

        public PatientController(AppDbContext context, PatientServices patientServices)
        {
            _patientServices = patientServices;
            _context = context;
        }

        [HttpGet("PatientAll")]
        public async Task<ActionResult<List<Patient>>> GetAllPatient()
        {
            var result = await _patientServices.GetAllPatient();
            if (result == null)
            {
                return NotFound("No pacient was found");
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


        [HttpGet("GetPatient/{id}")]
        public async Task<ActionResult<Patient>> GetSinglePatient(int id)
        {
            var result = await _patientServices.GetSinglePatient(id);
            if (result == null)
            {
                return NotFound("Pacienti not found");
            }
            return Ok(result);
        }

        [Authorize(Roles = "Admin,Patient")]
        [HttpPut("PatientUpdate/{id}")]
        public async Task<ActionResult<Patient>> UpdatePatient(int id, PatientVM pacienti)
        {
            var result = await _patientServices.UpdatePatient(id, new Patient
            {
                EmriMbiemri = pacienti.EmriMbiemri,
                DataLindjes = pacienti.DataLindjes,
                Gjinia = pacienti.Gjinia,
                Username = pacienti.Username,
                Email = pacienti.Email,



            });
            if (result == null)
            {
                return NotFound("Pacienti not found");
            }
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("PatientDelete/{id}")]
        public async Task<ActionResult<List<Patient>>> DeletePatient(int id)
        {
            var result = await _patientServices.DeletePatient(id);
            if (result == null) return NotFound("Patient not found");
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<ActionResult<ServiceResponse<LoginResponse>>> Login(Login request)
        {
            var response = await _patientServices.Login(request.Email, request.Password);
            if (!(bool)response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<ServiceResponse<LoginResponse>>> RefreshToken([FromBody] string refreshToken)
        {
            var response = await _patientServices.RefreshToken(refreshToken);
            if (!(bool)response.Success)
            {
                return Unauthorized(response);
            }
            return Ok(response);
        }



        [HttpPost("add-patient")]
        public async Task<ActionResult<List<Patient>>> AddPatient(PatientVM pacienti)
        {

            var result = await _patientServices.AddPatient(
                new Patient
                {
                    EmriMbiemri = pacienti.EmriMbiemri,
                    DataLindjes = pacienti.DataLindjes,
                    Gjinia = pacienti.Gjinia,
                    Username = pacienti.Username,
                    Email = pacienti.Email,



                }
                , pacienti.Password);
            return Ok(result);
        }

        [HttpGet("search")]
        public IActionResult SearchPatients(string name)
        {
            var patients = _patientServices.SearchByName(name);
            return Ok(patients);
        }



    }
}
