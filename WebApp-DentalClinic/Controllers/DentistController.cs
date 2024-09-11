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
    public class DentistController : ControllerBase
    {
        public DentistServices _dentistServices;

        public DentistController(DentistServices dentistServices)
        {
            _dentistServices = dentistServices;
        }

        [HttpGet("/DentistAll")]
        public async Task<ActionResult<List<Dentist>>> GetAllDentist()
        {
            var result = await _dentistServices.GetAllDentist();
            if (result == null)
            {
                return NotFound("Dentist not found");
            }
            return Ok(result);
        }

        [Authorize(Roles = "Dentist")]
        [HttpGet("/DentistProfile")]
        public async Task<ActionResult<Dentist>> GetDentistProfile()
        {
            int id = int.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)!.Value);

            return await _dentistServices.GetSingleDentist(id);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Dentist>> GetSingleDentist(int id)
        {
            var result = await _dentistServices.GetSingleDentist(id);
            if (result == null)
            {
                return NotFound("Dentist not found");
            }
            return Ok(result);
        }

        [Authorize(Roles = "Dentist,Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<List<Dentist>>> UpdateDentist(int id, DentistVM mjeku)
        {

            var result = await _dentistServices.UpdateDentist(id, new Dentist
            {
                EmriMbiemri = mjeku.EmriMbiemri,
                Degree = mjeku.Degree,
                Orari = mjeku.Orari,
                Paga = mjeku.Paga,
                Username = mjeku.Username,
                Email = mjeku.Email,
                DepartmentId = mjeku.DepartmentId,

            });
            if (result == null)
            {
                return NotFound("Mjeku not found");
            }
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Dentist>>> DeleteDentist(int id)
        {
            var result = await _dentistServices.DeleteDentist(id);
            if (result == null) return NotFound("Dentist not found");
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<ActionResult<List<Dentist>>> Login(Login request)
        {
            var response = await _dentistServices.Login(request.Email, request.Password);
            if (!(bool)response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<List<Dentist>>> AddDentist(DentistVM mjeku)
        {
            var result = await _dentistServices.AddDentist(
                new Dentist
                {
                    EmriMbiemri = mjeku.EmriMbiemri,
                    Degree = mjeku.Degree,
                    Orari = mjeku.Orari,
                    Paga = mjeku.Paga,
                    Username = mjeku.Username,
                    Email = mjeku.Email,
                    DepartmentId = mjeku.DepartmentId,

                }
                , mjeku.Password);
            if (result == null)
            {
                return NotFound(result);
            }
            return Ok(result);
        }
    }
}
