using System;
using System.Threading.Tasks;
using iCoode.Core.Interfaces.Services;
using iCoode.Core.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace iCoode.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class AuthController : ControllerBase
    {
        private IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SignIn([FromBody] AuthenticationRequest request)
        {
            return Ok(await _authService.AuthenticateAsync(request));
        }
    }
}