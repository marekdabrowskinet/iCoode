namespace iCoode.Core.Interfaces.DAL
{
    public interface IXmlDataProvider
    {
        string FilePath { get; }
        string AuthSecret { get; }
        bool AllowEmptyPassword { get; }
    }
}