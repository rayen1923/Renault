namespace back.Models
{
    public class CreateRdvDto
    {
        public int VehicleId { get; set; }
        public int PhoneNumberId { get; set; }
        public int ServiceId { get; set; }
        public int AgencyId { get; set; }

        public DateTime AppointmentDate { get; set; }
        public TimeSpan AppointmentTime { get; set; }
    }
}
