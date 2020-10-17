using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace iCoode.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class AuthController : ControllerBase
    {
    }
}