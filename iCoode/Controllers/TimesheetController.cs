using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iCoode.Core.Interfaces.Services;
using iCoode.Core.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace iCoode.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class TimesheetController : ControllerBase
    {
        private ITimesheetService _timesheetService;

        public TimesheetController(ITimesheetService timesheetService)
        {
            _timesheetService = timesheetService;
        }

        [HttpGet]
        public async Task<IActionResult> Read(DateTime date)
        {
            return Ok(await _timesheetService.ReadAsync(date));
        }

        [HttpGet]
        public async Task<IActionResult> IsExist(DateTime date)
        {
            return Ok(await _timesheetService.IsExistAsync(date));
        }

        [HttpGet]
        public async Task<IActionResult> Create(DateTime date)
        {
            return Ok(await _timesheetService.CreateAsync(date));
        }

        [HttpPost]
        public async Task<IActionResult> UpdateDay(TimesheetDay day)
        {
            await _timesheetService.UpdateDayAsync(day);
            return Ok(true);
        }
    }
}
