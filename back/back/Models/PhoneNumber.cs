namespace back.Models
{
    public class PhoneNumber
    {
        public int Id { get; set; }

        public int VehicleId { get; set; }

        public string PhoneNumberValue { get; set; }

        public bool IsVerified { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
