using back.Models;
using back.DAO.IDAO;
using MySql.Data.MySqlClient;

namespace back.DAO.Infrastructure
{
    public class RdvDao : IRdvDao
    {
        private readonly DbConnectionFactory _factory;

        public RdvDao(DbConnectionFactory factory)
        {
            _factory = factory;
        }

        // CREATE RDV
        public void Create(Rdv rdv)
        {
            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand(@"
                INSERT INTO rdvs
                (vehicle_id, phone_number_id, service_id, agency_id, appointment_date, appointment_time)
                VALUES
                (@v, @p, @s, @a, @d, @t)", conn);

            cmd.Parameters.AddWithValue("@v", rdv.VehicleId);
            cmd.Parameters.AddWithValue("@p", rdv.PhoneNumberId);
            cmd.Parameters.AddWithValue("@s", rdv.ServiceId);
            cmd.Parameters.AddWithValue("@a", rdv.AgencyId);
            cmd.Parameters.AddWithValue("@d", rdv.AppointmentDate);
            cmd.Parameters.AddWithValue("@t", rdv.AppointmentTime);

            cmd.ExecuteNonQuery();
        }

        // GET ALL RDV
        public List<Rdv> GetAll()
        {
            var list = new List<Rdv>();

            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand(
                "SELECT * FROM rdvs",
                conn);

            using var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                list.Add(new Rdv
                {
                    Id = Convert.ToInt32(reader["id"]),
                    VehicleId = Convert.ToInt32(reader["vehicle_id"]),
                    PhoneNumberId = Convert.ToInt32(reader["phone_number_id"]),
                    ServiceId = Convert.ToInt32(reader["service_id"]),
                    AgencyId = Convert.ToInt32(reader["agency_id"]),
                    AppointmentDate = Convert.ToDateTime(reader["appointment_date"]),
                    AppointmentTime = TimeSpan.Parse(reader["appointment_time"].ToString())
                });
            }

            return list;
        }

        // GET RDV BY AGENCY
        public List<Rdv> GetByAgency(int agencyId)
        {
            var list = new List<Rdv>();

            using var conn = _factory.CreateConnection();
            conn.Open();

            var query = @"
                SELECT *
                FROM rdvs
                WHERE agency_id = @agencyId";

            var cmd = new MySqlCommand(query, conn);

            cmd.Parameters.AddWithValue("@agencyId", agencyId);

            using var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                list.Add(new Rdv
                {
                    Id = Convert.ToInt32(reader["id"]),
                    VehicleId = Convert.ToInt32(reader["vehicle_id"]),
                    PhoneNumberId = Convert.ToInt32(reader["phone_number_id"]),
                    ServiceId = Convert.ToInt32(reader["service_id"]),
                    AgencyId = Convert.ToInt32(reader["agency_id"]),
                    AppointmentDate = Convert.ToDateTime(reader["appointment_date"]),
                    AppointmentTime = TimeSpan.Parse(reader["appointment_time"].ToString())
                });
            }

            return list;
        }
    }
}