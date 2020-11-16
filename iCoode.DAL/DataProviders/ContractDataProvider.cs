using System.Linq;
using System.Threading.Tasks;
using iCoode.Core.Exceptions;
using iCoode.Core.Interfaces.DAL;
using iCoode.Core.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace iCoode.DAL.DataProviders
{
    public class ContractDataProvider: DataProviderBase<Contract>, IContractDataProvider
    {
        public override async Task DeleteAsync(int id)
        {
            var contract = await context.Contracts.FirstOrDefaultAsync(c => c.Id == id);
            if(contract is null)
                throw new ContractException("Contract not found");

            context.Contracts.Remove(contract);
            await context.SaveChangesAsync();
        }

        public async Task<Contract> ReadAsync(string name)
        {
            return await context.Contracts.FirstOrDefaultAsync(c => c.Number.ToUpper() == name.ToUpper());
        }

        public async Task<bool> IsExistAsync(Contract contract)
        {
            return await context.Contracts.AnyAsync(c => c.Id == contract.Id || c.Number.ToUpper() == contract.Number.ToUpper());
        }

        public override async Task UpdateAsync(Contract model)
        {
            var contractToUpdate = await context.Contracts.FirstOrDefaultAsync(c => c.Id == model.Id);

            if(contractToUpdate is null)
                throw new ContractException("Contract not found");

            contractToUpdate.Number = model.Number;
            contractToUpdate.Description = model.Description;
            contractToUpdate.HourlyRate = model.HourlyRate;
            await context.SaveChangesAsync();
        }
    }
}