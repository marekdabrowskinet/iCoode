using System;

namespace iCoode.Core.Exceptions
{
    public class ContractException : Exception
    {
        public ContractException(string message): base(message)
        {
        }
    }
}