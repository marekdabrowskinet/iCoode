using System.Collections.Generic;
using System.Threading.Tasks;
using iCoode.Core.Models;

namespace iCoode.Core.Interfaces.DAL
{
    public interface ICrud<T>
        where T : DBModel
    {
        Task CreateAsync(T model);
        Task<T> ReadAsync(int id);
        Task<ICollection<T>> ReadAllAsync();
        Task UpdateAsync(T model);
        Task DeleteAsync(int id);
    }
}