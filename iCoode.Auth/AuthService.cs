using iCoode.Core.Interfaces.Services;
using iCoode.Core.Models.Entities;
using System.Threading.Tasks;

namespace iCoode.Auth
{
    public class AuthService : IAuthService
    {
        public Task<User> AuthenticateAsync(User request)
        {
            throw new System.NotImplementedException();
        }

        public void ChangePassword(ref User employee)
        {
            throw new System.NotImplementedException();
        }

        public string EncodePassword(string password)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> IsExistsAsync(string username)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> RegisterAsync(User employee)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> VerifyPasswordAsync(string username, string password)
        {
            throw new System.NotImplementedException();
        }
    }
}