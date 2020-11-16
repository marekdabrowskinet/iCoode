using System.Threading.Tasks;
using iCoode.Core.Models.Entities;

namespace iCoode.Core.Interfaces.DAL
{
    public interface IContractDataProvider: ICrud<Contract>
    {
        Task<Contract> ReadAsync(string name);
        Task<bool> IsExistAsync(Contract contract);
    }
}