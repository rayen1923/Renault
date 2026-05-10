using back.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserService _service;

    public AuthController(UserService service)
    {
        _service = service;
    }

    [HttpPost("login")]
    public IActionResult Login(LoginDto dto)
    {
        var user = _service.Login(dto.Email, dto.Password);

        if (user == null)
            return Unauthorized("Invalid credentials");

        return Ok(user);
    }
}