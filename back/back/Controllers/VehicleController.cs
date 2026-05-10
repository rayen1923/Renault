using Microsoft.AspNetCore.Mvc;
using back.Business;
using back.Models;

namespace back.Controllers
{
    [ApiController]
    [Route("api/vehicles")]
    public class VehicleController : ControllerBase
    {
        private readonly VehicleService _service;

        public VehicleController(VehicleService service)
        {
            _service = service;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Vehicle v)
        {
            var result = _service.Login(v.Serie, v.ChassisNumber);

            if (result == null)
                return NotFound("Vehicle not found");

            return Ok(result);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAll());
        }

        [HttpPost]
        public IActionResult Add([FromBody] Vehicle v)
        {
            _service.Add(v);
            return Ok();
        }
    }
}