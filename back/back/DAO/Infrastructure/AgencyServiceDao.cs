using MySql.Data.MySqlClient;
using back.Models;
using back.DAO.IDAO;

namespace back.DAO.Infrastructure
{
    public class AgencyServiceDao : IAgencyServiceDao
    {
        private readonly DbConnectionFactory _factory;

        public AgencyServiceDao(DbConnectionFactory factory)
        {
            _factory = factory;
        }

        public void AddServiceToAgency(int agencyId, int serviceId)
        {
            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand(
                "INSERT INTO agencyservices(AgencyId, ServiceId) VALUES(@a, @s)",
                conn);

            cmd.Parameters.AddWithValue("@a", agencyId);
            cmd.Parameters.AddWithValue("@s", serviceId);

            cmd.ExecuteNonQuery();
        }

        public void RemoveServiceFromAgency(int agencyId, int serviceId)
        {
            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand(
                "DELETE FROM agencyservices WHERE AgencyId=@a AND ServiceId=@s",
                conn);

            cmd.Parameters.AddWithValue("@a", agencyId);
            cmd.Parameters.AddWithValue("@s", serviceId);

            cmd.ExecuteNonQuery();
        }

        // GET services of agency
        public List<Service> GetServicesByAgency(int agencyId)
        {
            var list = new List<Service>();

            using var conn = _factory.CreateConnection();
            conn.Open();

            var query = @"
                SELECT s.*
                FROM services s
                INNER JOIN agencyservices ags
                    ON s.Id = ags.ServiceId
                WHERE ags.AgencyId = @agencyId";

            var cmd = new MySqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@agencyId", agencyId);

            using var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                list.Add(new Service
                {
                    Id = Convert.ToInt32(reader["Id"]),
                    Name = reader["Name"].ToString(),
                    Description = reader["Description"].ToString(),
                    Img = reader["Img"].ToString(),
                    DurationMinutes = reader["DurationMinutes"] == DBNull.Value
                        ? null
                        : Convert.ToInt32(reader["DurationMinutes"])
                });
            }

            return list;
        }

        // GET agencies of service
        public List<Agency> GetAgenciesByService(int serviceId)
        {
            var list = new List<Agency>();

            using var conn = _factory.CreateConnection();
            conn.Open();

            var query = @"
                SELECT a.*
                FROM agencies a
                INNER JOIN agencyservices ags
                    ON a.Id = ags.AgencyId
                WHERE ags.ServiceId = @serviceId";

            var cmd = new MySqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@serviceId", serviceId);

            using var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                list.Add(new Agency
                {
                    Id = Convert.ToInt32(reader["Id"]),
                    Name = reader["Name"].ToString(),
                    Address = reader["Address"]?.ToString(),
                    Email = reader["Email"]?.ToString(),
                    Phone = reader["Phone"]?.ToString()
                });
            }

            return list;
        }
    }
}