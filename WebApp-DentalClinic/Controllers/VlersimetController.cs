using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp_DentalClinic.Services;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VlersimetController : ControllerBase
    {
        public VlersimetServices _vlersimetService;

        public VlersimetController(VlersimetServices vlersimetService)
        { 
            _vlersimetService = vlersimetService;
            
        }

        [HttpPost("add-vlersimi")]
        public IActionResult AddVlersimi([FromBody] VlersimetVM vlersimi)
        {
            _vlersimetService.AddVlersimi(vlersimi);
            return Ok();
        }

        [HttpGet("get-all-vlersimet")]
        public IActionResult GetAllVlersimet()
        {
            var allVlersimet = _vlersimetService.GetAllVlersimet();
            return Ok(allVlersimet);
        }

        [HttpGet("get-vlersimet-by-id/{id}")]
        public IActionResult GetVlersimetById(int id)
        {
            var vlersimet = _vlersimetService.GetVlersimetById(id);
            return Ok(vlersimet);
        }

        [HttpPut("update-vlersimet-by-id/{id}")]
        public IActionResult UpdateVlersimetById(int id, [FromBody] VlersimetVM vlersimet)
        {
            var updatedVlersimet = _vlersimetService.UpdateVlersimetById(id, vlersimet);
            return Ok(updatedVlersimet);
        }

        [HttpDelete("delete-vlersimet-by-id/{id}")]
        public IActionResult DeleteVlersimetById(int id)
        {
            _vlersimetService.DeleteVlersimetById(id);
            return Ok();
        }
    }
}
