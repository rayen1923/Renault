using Microsoft.AspNetCore.Mvc;
using back.Business;

namespace back.Controllers
{
    [ApiController]
    [Route("api/otp")]
    public class OtpController : ControllerBase
    {
        private readonly OtpService _service;

        public OtpController(OtpService service)
        {
            _service = service;
        }

        [HttpPost("send/{phone}")]
        public IActionResult Send(string phone)
        {
            var code = _service.Send(phone);

            return Ok(new
            {
                message = "OTP sent",
                code = code
            });
        }

        [HttpPost("verify")]
        public IActionResult Verify(string phone, string code)
        {
            var ok = _service.Verify(phone, code);

            return Ok(new
            {
                success = ok
            });
        }
    }
}