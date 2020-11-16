using System.Collections.Generic;
using System.Threading.Tasks;
using iCoode.Core.Models.Entities;

namespace iCoode.Core.Interfaces.Services
{
    public interface IContractService
    {
        Task<bool> CreateAsync(Contract contract);
        Task<IEnumerable<Contract>> ReadAllAsync();
        Task<bool> DeleteAsync(Contract contract);
        Task<Contract> ReadAsync(int id);
        Task UpdateAsync(Contract contract);
    }
}