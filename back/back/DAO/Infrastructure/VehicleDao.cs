using MySql.Data.MySqlClient;
using back.Models;
using back.DAO.IDAO;

namespace back.DAO.Infrastructure
{
    public class VehicleDao : IVehicleDao
    {
        private readonly DbConnectionFactory _factory;

        public VehicleDao(DbConnectionFactory factory)
        {
            _factory = factory;
        }

        public Vehicle Login(string serie, string chassisNumber)
        {
            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand(
                "SELECT * FROM vehicles WHERE Serie=@s AND ChassisNumber=@c",
                conn);

            cmd.Parameters.AddWithValue("@s", serie);
            cmd.Parameters.AddWithValue("@c", chassisNumber);

            var reader = cmd.ExecuteReader();

            if (reader.Read())
            {
                return new Vehicle
                {
                    Id = Convert.ToInt32(reader["Id"]),
                    Serie = reader["Serie"].ToString(),
                    ChassisNumber = reader["ChassisNumber"].ToString(),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"])
                };
            }

            return null;
        }

        public List<Vehicle> GetAll()
        {
            var list = new List<Vehicle>();

            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand("SELECT * FROM vehicles", conn);
            var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                list.Add(new Vehicle
                {
                    Id = Convert.ToInt32(reader["Id"]),
                    Serie = reader["Serie"].ToString(),
                    ChassisNumber = reader["ChassisNumber"].ToString(),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"])
                });
            }

            return list;
        }

        public void Add(Vehicle v)
        {
            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand(@"
                INSERT INTO vehicles(Serie, ChassisNumber)
                VALUES(@s, @c)", conn);

            cmd.Parameters.AddWithValue("@s", v.Serie);
            cmd.Parameters.AddWithValue("@c", v.ChassisNumber);

            cmd.ExecuteNonQuery();
        }
    }
}