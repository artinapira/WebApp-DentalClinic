using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.Services;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnkesatController : ControllerBase
    {
        public AnkesatServices _ankesatService;

        public AnkesatController(AnkesatServices ankesatService)
        {
            _ankesatService = ankesatService;
        }

        [HttpPost("add-ankesat")]
        public IActionResult AddAnkesat([FromBody] AnkesatVM ankesat)
        {
            _ankesatService.AddAnkesat(ankesat);
            return Ok();
        }

        [HttpGet("get-all-ankesat")]
        public IActionResult GetAllAnkesat()
        {
            var allankesat = _ankesatService.GetAllAnkesat();
            return Ok(allankesat);
        }

        [HttpGet("get-ankesat-by-id/{id}")]
        public IActionResult GetAnkesatById(int id)
        {
            var ankesat = _ankesatService.GetAnkesatById(id);
            return Ok(ankesat);
        }

        [HttpPut("update-ankesat-by-id/{id}")]
        public IActionResult UpdateAnkesatById(int id, [FromBody] AnkesatVM ankesat)
        {
            var updatedAnkesat = _ankesatService.UpdateAnkesatById(id, ankesat);
            return Ok(updatedAnkesat);
        }

        [HttpDelete("delete-ankesat-by-id/{id}")]
        public IActionResult DeleteAnkesatById(int id)
        {
            _ankesatService.DeleteAnkesatById(id);
            return Ok();
        }
    }
}
