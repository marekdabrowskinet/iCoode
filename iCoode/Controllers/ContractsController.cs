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
    public class ContractsController : ControllerBase
    {
        private IContractService _contractService;
        public ContractsController(IContractService contractService)
        {
            _contractService = contractService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Contract contract)
        {
            return Ok(await _contractService.CreateAsync(contract));
        }

        [HttpGet]
        public async Task<IActionResult> ReadAll()
        {
            return Ok(await _contractService.ReadAllAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Delete(Contract contract)
        {
            return Ok(await _contractService.DeleteAsync(contract));
        }

        [HttpPost]
        public async Task<IActionResult> Update(Contract contract)
        {
            await _contractService.UpdateAsync(contract);
            return Ok(true);
        }

        [HttpGet]
        public async Task<IActionResult> Read(int id)
        {
            return Ok(await _contractService.ReadAsync(id));
        }
    }
}
