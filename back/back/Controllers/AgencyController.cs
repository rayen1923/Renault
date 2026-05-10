using Microsoft.AspNetCore.Mvc;
using back.Models;
using back.Business;

namespace back.Controllers
{
    [ApiController]
    [Route("api/agencies")]
    public class AgencyController : ControllerBase
    {
        private readonly AgencyService _service;

        public AgencyController(AgencyService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var a = _service.GetById(id);
            if (a == null)
                return NotFound();

            return Ok(a);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Agency a)
        {
            _service.Add(a);
            return Ok(a);
        }

        [HttpPut]
        public IActionResult Update([FromBody] Agency a)
        {
            _service.Update(a);
            return Ok(a);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _service.Delete(id);
            return Ok();
        }
    }
}