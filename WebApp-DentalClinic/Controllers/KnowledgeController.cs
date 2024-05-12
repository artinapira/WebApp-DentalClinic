using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp_DentalClinic.Services;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KnowledgeController : ControllerBase
    {
        public KnowledgeServices _knowledgeService;

        public KnowledgeController(KnowledgeServices knowledgeService)
        {
            _knowledgeService = knowledgeService;
        }

        [HttpPost("add-knowledge")]
        public IActionResult AddKnowledge([FromBody] KnowledgeVM knowledge)
        {
            _knowledgeService.AddKnowledge(knowledge);
            return Ok();
        }

        [HttpGet("get-all-knowledge")]
        public IActionResult GetAllKnowledge()
        {
            var allknowledges = _knowledgeService.GetAllKnowledge();
            return Ok(allknowledges);
        }

        [HttpGet("get-Knowledge-by-id/{id}")]
        public IActionResult GetKnowledgeById(int knowledgeId)
        {
            var knowledges = _knowledgeService.GetKnowledgeById(knowledgeId);
            return Ok(knowledges);
        }

        [HttpPut("update-knowledge-by-id/{id}")]
        public IActionResult UpdateKnowledgeById(int knowledgeId, [FromBody] KnowledgeVM knowledge)
        {
            var updatedknowledge = _knowledgeService.UpdateKnowledgeById(knowledgeId, knowledge);
            return Ok(updatedknowledge);
        }

        [HttpDelete("delete-knowledge-by-id/{id}")]
        public IActionResult DeleteKnowledgeById(int knowledgeId)
        {
            _knowledgeService.DeleteKnowledgeById(knowledgeId);
            return Ok();
        }
    }
}
