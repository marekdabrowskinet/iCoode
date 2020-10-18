using iCoode.Core.Models.Entities;

namespace iCoode.Core.Models.Responses
{
    public class AuthenticationResponse
    {
        public User User { get; set; }
        public string Token { get; set; }
    }
}