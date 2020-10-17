using System.Threading.Tasks;
using iCoode.Core.Models.Entities;

namespace iCoode.Core.Interfaces.DAL
{
    public interface IUserDataProvider : ICrud<User>
    {
        Task<User> ReadAsync(string login);
    }
}