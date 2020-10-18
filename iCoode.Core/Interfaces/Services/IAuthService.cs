using System.Threading.Tasks;
using iCoode.Core.Models.Entities;
using iCoode.Core.Models.Requests;
using iCoode.Core.Models.Responses;

namespace iCoode.Core.Interfaces.Services
{
    public interface IAuthService
    {
        Task<bool> IsExistsAsync(string username);
        Task<AuthenticationResponse> AuthenticateAsync(AuthenticationRequest request);
        Task<bool> RegisterAsync(User user);
        Task<bool> VerifyPasswordAsync(string username, string password);
        void ChangePassword(ref User user);
        string EncodePassword(string password);
    }
}