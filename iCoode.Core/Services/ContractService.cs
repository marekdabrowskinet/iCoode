using System.Collections.Generic;
using System.Threading.Tasks;
using iCoode.Core.Exceptions;
using iCoode.Core.Interfaces.DAL;
using iCoode.Core.Interfaces.Services;
using iCoode.Core.Models.Entities;

namespace iCoode.Core.Services
{
    public class ContractService: IContractService
    {
        private IContractDataProvider _contractDataProvider;

        public ContractService(IContractDataProvider contractDataProvider)
        {
            _contractDataProvider = contractDataProvider;
        }
        public async Task<bool> CreateAsync(Contract contract)
        {
            if (await IsExistAsync(contract))
                throw new ContractException("Contract with this number already exist");
            await _contractDataProvider.CreateAsync(contract);

            return contract.Id != 0;
        }

        public async Task<bool> DeleteAsync(Contract contract)
        {
            if(contract.Id == 0)
                throw new ContractException("Contract id can't be null");
            await _contractDataProvider.DeleteAsync(contract.Id);
            return true;
        }

        public async Task<IEnumerable<Contract>> ReadAllAsync()
        {
            var contracts = await  _contractDataProvider.ReadAllAsync();

            return contracts;
        }

        public async Task<Contract> ReadAsync(int id)
        {
            return await _contractDataProvider.ReadAsync(id);
        }

        public async Task<Contract> ReadAsync(string name)
        {
            return await _contractDataProvider.ReadAsync(name);
        }

        public async Task UpdateAsync(Contract contract)
        {
            if(contract.Id == 0)
                throw new ContractException("Contract id is incorrect");
            if(!await IsExistAsync(contract))
                throw new ContractException("Contract not exist");

            await _contractDataProvider.UpdateAsync(contract);
        }

        private async Task<bool> IsExistAsync(Contract contract)
        {
            return await _contractDataProvider.IsExistAsync(contract);
        }
    }
}