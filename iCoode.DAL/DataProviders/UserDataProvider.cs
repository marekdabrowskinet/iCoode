using System.Threading.Tasks;
using iCoode.Core.Interfaces.DAL;
using iCoode.Core.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace iCoode.DAL.DataProviders
{
    public class UserDataProvider : DataProviderBase<User>, IUserDataProvider
    {
        public async Task<User> ReadAsync(string login)
        {
            return await context.Users.FirstOrDefaultAsync(u => u.Login == login);
        }
    }
}