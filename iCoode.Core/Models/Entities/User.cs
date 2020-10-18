using System.Text.Json.Serialization;

namespace iCoode.Core.Models.Entities
{
    public class User : DBModel
    {
        public string Username { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
    }
}