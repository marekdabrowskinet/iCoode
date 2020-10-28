using System;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using iCoode.Core.Interfaces.Services;
using iCoode.Core.Models.Entities;
using System.Threading.Tasks;
using iCoode.Auth.Exceptions;
using iCoode.Core.Interfaces.DAL;
using System.IdentityModel.Tokens.Jwt;
using iCoode.Core.Models.Requests;
using iCoode.Core.Models.Responses;
using Microsoft.IdentityModel.Tokens;

namespace iCoode.Auth
{
    public class AuthService : IAuthService
    {
        private IUserDataProvider _userDataProvider;
        private IXmlDataProvider _xmlDataProvider;

        public AuthService(IUserDataProvider userDataProvider, IXmlDataProvider xmlDataProvider)
        {
            _userDataProvider = userDataProvider;
            _xmlDataProvider = xmlDataProvider;
        }

        public async Task<AuthenticationResponse> AuthenticateAsync(AuthenticationRequest request)
        {
            if (string.IsNullOrEmpty(request.Username))
                throw new UserException("Username cannot be empty");
            
            if(!await IsExistsAsync(request.Username))
                throw new UserException("User not exist");

            var user = await _userDataProvider.ReadAsync(request.Username);

            if(string.IsNullOrEmpty(request.Password) && !_xmlDataProvider.AllowEmptyPassword)
                throw new UserException("Password cannot be empty");

            if (!await VerifyPasswordAsync(user.Username, request.Password))
                throw new UserException("Authentication failed");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_xmlDataProvider.AuthSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username)
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials =
                    new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var response = new AuthenticationResponse {User = user, Token = tokenHandler.WriteToken(token)};
            return response;
        }

        public void ChangePassword(ref User user)
        {
            user.Password = EncodePassword(user.Password);
        }

        public string EncodePassword(string password)
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);
            return Convert.ToBase64String(hashBytes);
        }

        public async Task<bool> IsExistsAsync(string username)
        {
            return await _userDataProvider.ReadAsync(username) != null;
        }

        public async Task<bool> RegisterAsync(User user)
        {
            if(await IsExistsAsync(user.Username))
                throw new UserException("User already exist");

            user.Password = EncodePassword(user.Password);
            await _userDataProvider.CreateAsync(user);
            return user.Id != 0;
        }

        public async Task<bool> VerifyPasswordAsync(string username, string password)
        {
            var user = await _userDataProvider.ReadAsync(username);

            if (string.IsNullOrEmpty(user.Password))
                return await Task.FromResult(true);

            /* Extract the bytes */
            byte[] hashBytes = Convert.FromBase64String(user.Password);
            /* Get the salt */
            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);
            /* Compute the hash on the password the employee entered */
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);
            /* Compare the results */
            for (int i = 0; i < 20; i++)
            {
                if (hashBytes[i + 16] != hash[i])
                {
                    return await Task.FromResult(false);
                }
            }

            return await Task.FromResult(true);
        }
    }
}