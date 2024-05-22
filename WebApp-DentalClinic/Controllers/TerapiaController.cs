using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.Services;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TerapiaController : ControllerBase
    {
        public TerapiaServices _terapiaService;

        public TerapiaController(TerapiaServices terapiaServices)
        {
            _terapiaService = terapiaServices;
        }

        [HttpPost("add-terapia")]
        public IActionResult AddTerapia([FromBody] TerapiaVM terapia)
        {
            _terapiaService.AddTerapia(terapia);
            return Ok();
        }

        [HttpGet("get-all-terapias")]
        public IActionResult GetAllTerapia()
        {
            var allTerapia = _terapiaService.GetAllTerapia();
            return Ok(allTerapia);
        }

        [HttpGet("get-terapia-by-id/{id}")]
        public IActionResult GetTerapiaById(int id)
        {
            var terapia = _terapiaService.GetTerapiaById(id);
            return Ok(terapia);
        }

        [HttpPut("update-terapia-by-id/{id}")]
        public IActionResult UpdateTerapiaById(int id, [FromBody] TerapiaVM terapia)
        {
            var updatedTerapia = _terapiaService.UpdateTerapiaById(id, terapia);
            return Ok(updatedTerapia);
        }

        [HttpDelete("delete-terapia-by-id/{id}")]
        public IActionResult DeleteTerapiaById(int id)
        {
            _terapiaService.DeleteTerapiaById(id);
            return Ok();
        }
    }
}
