namespace iCoode.Core.Models.Entities
{
    public class Contract : DBModel
    {
        public string Number { get; set; }
        public string Description { get; set; }
        public decimal HourlyRate { get; set; }
    }
}