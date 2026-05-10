using back.Business;
using back.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/rdv")]
public class RdvController : ControllerBase
{
    private readonly RdvService _service;

    public RdvController(RdvService service)
    {
        _service = service;
    }

    [HttpPost]
    public IActionResult Create(CreateRdvDto dto)
    {
        _service.Create(dto);
        return Ok(new { message = "RDV created" });
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_service.GetAll());
    }
    

    [HttpGet("agency/{agencyId}")]
    public IActionResult GetByAgency(int agencyId)
    {
        return Ok(_service.GetByAgency(agencyId));
    }
}