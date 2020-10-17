using System;

namespace iCoode.Auth.Exceptions
{
    public class UserException : Exception
    {
        public UserException(string message): base(message)
        {
        }
    }
}