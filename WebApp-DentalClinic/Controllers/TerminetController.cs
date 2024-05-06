using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp_DentalClinic.Services;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TerminetController : ControllerBase
    {
        public TerminetServices _terminetService;

        public TerminetController(TerminetServices terminetService)
        {
            _terminetService = terminetService;
        }

        [HttpPost("add-termini")]
        public IActionResult AddTermini([FromBody] TerminetVM terminet)
        {
            _terminetService.AddTermini(terminet);
            return Ok();
        }

        [HttpGet("get-all-terminet")]
        public IActionResult GetAllTerminet()
        {
            var allTerminet = _terminetService.GetAllTerminet();
            return Ok(allTerminet);
        }

        [HttpGet("get-terminet-by-id/{id}")]
        public IActionResult GetTerminetById(int id)
        {
            var terminet = _terminetService.GetTerminetById(id);
            return Ok(terminet);
        }

        [HttpPut("update-terminet-by-id/{id}")]
        public IActionResult UpdateTerminetById(int id, [FromBody] TerminetVM terminet)
        {
            var updatedTerminet = _terminetService.UpdateTerminetById(id, terminet);
            return Ok(updatedTerminet);
        }

        [HttpDelete("delete-terminet-by-id/{id}")]
        public IActionResult DeleteTerminetById(int id)
        {
            _terminetService.DeleteTerminetById(id);
            return Ok();
        }
    }
}
