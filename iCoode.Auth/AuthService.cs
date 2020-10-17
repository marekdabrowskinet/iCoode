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
using Microsoft.IdentityModel.Tokens;

namespace iCoode.Auth
{
    public class AuthService : IAuthService
    {
        private IUserDataProvider _userDataProvider;

        public AuthService(IUserDataProvider userDataProvider)
        {
            _userDataProvider = userDataProvider;
        }

        public async Task<User> AuthenticateAsync(User request)
        {
            if(!await IsExistsAsync(request.Login))
                throw new UserException("User not exist");

            var employee = await _userDataProvider.ReadAsync(request.Login);

            if (!string.IsNullOrEmpty(employee.Password))
            {
                if (!await VerifyPasswordAsync(employee.Login, request.Password))
                {
                    return null;
                }
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(xmlDataProvider.GetAuthSecret());
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, employee.Id.ToString()),
                    new Claim(ClaimTypes.Name, employee.Username)
                }),
                Expires = DateTime.UtcNow.AddHours(5),
                SigningCredentials =
                    new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            employee.Token = tokenHandler.WriteToken(token);
            employee.PasswordHash = String.Empty;
            return employee;
        }

        public void ChangePassword(ref User user)
        {
            throw new System.NotImplementedException();
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
            if(await IsExistsAsync(user.Login))
                throw new UserException("User already exist");

            user.Password = EncodePassword(user.Password);
            await _userDataProvider.CreateAsync(user);
            return user.Id != 0;
        }

        public async Task<bool> VerifyPasswordAsync(string username, string password)
        {
            throw new System.NotImplementedException();
        }
    }
}