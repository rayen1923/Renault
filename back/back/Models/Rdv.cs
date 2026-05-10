public class Rdv
{
    public int Id { get; set; }

    public int VehicleId { get; set; }
    public int PhoneNumberId { get; set; }
    public int ServiceId { get; set; }
    public int AgencyId { get; set; }

    public DateTime AppointmentDate { get; set; }
    public TimeSpan AppointmentTime { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
}