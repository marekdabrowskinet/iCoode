using System.Threading.Tasks;
using iCoode.Core.Models.Entities;

namespace iCoode.Core.Interfaces.Services
{
    public interface IAuthService
    {
        Task<bool> IsExistsAsync(string username);
        Task<User> AuthenticateAsync(User request);
        Task<bool> RegisterAsync(User employee);
        Task<bool> VerifyPasswordAsync(string username, string password);
        void ChangePassword(ref User employee);
        string EncodePassword(string password);
    }
}