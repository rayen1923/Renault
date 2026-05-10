using Microsoft.AspNetCore.Mvc;
using back.Models;
using back.Business;

namespace back.Controllers
{
    [ApiController]
    [Route("api/services")]
    public class ServiceController : ControllerBase
    {
        private readonly ServiceService _service;

        public ServiceController(ServiceService service)
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
            var s = _service.GetById(id);
            if (s == null)
                return NotFound();

            return Ok(s);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Service s)
        {
            _service.Add(s);
            return Ok(s);
        }

        [HttpPut]
        public IActionResult Update([FromBody] Service s)
        {
            _service.Update(s);
            return Ok(s);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _service.Delete(id);
            return Ok();
        }
    }
}