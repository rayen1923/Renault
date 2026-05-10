using Microsoft.AspNetCore.Mvc;
using back.Business;

namespace back.Controllers
{
    [ApiController]
    [Route("api/agencyservices")]
    public class AgencyServiceController : ControllerBase
    {
        private readonly AgencyServiceManager _service;

        public AgencyServiceController(AgencyServiceManager service)
        {
            _service = service;
        }

        // POST: link service to agency
        [HttpPost("{agencyId}/{serviceId}")]
        public IActionResult Add(int agencyId, int serviceId)
        {
            _service.AddServiceToAgency(agencyId, serviceId);
            return Ok("Service added to agency");
        }

        // DELETE: unlink
        [HttpDelete("{agencyId}/{serviceId}")]
        public IActionResult Remove(int agencyId, int serviceId)
        {
            _service.RemoveServiceFromAgency(agencyId, serviceId);
            return Ok("Service removed from agency");
        }

        // GET services of agency
        [HttpGet("agency/{agencyId}")]
        public IActionResult GetServicesByAgency(int agencyId)
        {
            return Ok(_service.GetServicesByAgency(agencyId));
        }

        // GET agencies of service
        [HttpGet("service/{serviceId}")]
        public IActionResult GetAgenciesByService(int serviceId)
        {
            return Ok(_service.GetAgenciesByService(serviceId));
        }
    }
}