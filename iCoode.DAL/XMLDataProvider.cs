using System;
using iCoode.Core.Interfaces.DAL;
using System.Linq;
using System.Xml;
using System.Xml.Linq;

namespace iCoode.DAL
{
    public class XmlDataProvider : IXmlDataProvider
    {
        public string FilePath => @".\\\\.\\iCoode.config.xml";

        public string AuthSecret => _configuration.Root.Elements("Authorization").First().Attribute("secret").Value;

        public string ConnectionString => _configuration.Root.Elements("DatabaseConnectionString").First().Attribute("connectionString").Value;

        private XDocument _configuration;

        public XmlDataProvider()
        {
            LoadConfiguration();
        }

        private void LoadConfiguration()
        {
            _configuration = XDocument.Load(FilePath);
            if(_configuration == null)
                throw new XmlException("Cannot read xml file");
        }
    }
}