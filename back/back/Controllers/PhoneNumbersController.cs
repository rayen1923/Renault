using Microsoft.AspNetCore.Mvc;
using back.Business;
using back.Models;

namespace back.Controllers
{
    [ApiController]
    [Route("api/phonenumbers")]
    public class PhoneNumbersController : ControllerBase
    {
        private readonly PhoneNumberService _service;

        public PhoneNumbersController(PhoneNumberService service)
        {
            _service = service;
        }

        [HttpGet("{vehicleId}")]
        public IActionResult GetByVehicle(int vehicleId)
        {
            return Ok(_service.GetByVehicle(vehicleId));
        }

        [HttpPost]
        public IActionResult Add([FromBody] PhoneNumber phone)
        {
            _service.Add(phone);
            return Ok();
        }
    }
}