using back.DAO.IDAO;
using back.Models;
using MySql.Data.MySqlClient;

namespace back.DAO.Infrastructure
{
    public class ServiceDao : IServiceDao
    {
        private readonly DbConnectionFactory _factory;

        public ServiceDao(DbConnectionFactory factory)
        {
            _factory = factory;
        }

        public List<Service> GetAll()
        {
            var list = new List<Service>();

            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand("SELECT * FROM services", conn);
            var reader = cmd.ExecuteReader();

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

        public Service GetById(int id)
        {
            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand("SELECT * FROM services WHERE Id=@id", conn);
            cmd.Parameters.AddWithValue("@id", id);

            var reader = cmd.ExecuteReader();

            if (reader.Read())
            {
                return new Service
                {
                    Id = Convert.ToInt32(reader["Id"]),
                    Name = reader["Name"].ToString(),
                    Description = reader["Description"].ToString(),
                    Img = reader["Img"].ToString(),
                    DurationMinutes = reader["DurationMinutes"] == DBNull.Value
                        ? null
                        : Convert.ToInt32(reader["DurationMinutes"])
                };
            }

            return null;
        }

        public void Add(Service s)
        {
            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand(@"
            INSERT INTO services(Name, Description, Img, DurationMinutes)
            VALUES(@n, @d, @i, @t)", conn);

            cmd.Parameters.AddWithValue("@n", s.Name);
            cmd.Parameters.AddWithValue("@d", s.Description);
            cmd.Parameters.AddWithValue("@i", s.Img);
            cmd.Parameters.AddWithValue("@t", s.DurationMinutes);

            cmd.ExecuteNonQuery();
        }

        public void Update(Service s)
        {
            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand(@"
            UPDATE services 
            SET Name=@n, Description=@d, Img=@i, DurationMinutes=@t
            WHERE Id=@id", conn);

            cmd.Parameters.AddWithValue("@id", s.Id);
            cmd.Parameters.AddWithValue("@n", s.Name);
            cmd.Parameters.AddWithValue("@d", s.Description);
            cmd.Parameters.AddWithValue("@i", s.Img);
            cmd.Parameters.AddWithValue("@t", s.DurationMinutes);

            cmd.ExecuteNonQuery();
        }

        public void Delete(int id)
        {
            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand("DELETE FROM services WHERE Id=@id", conn);
            cmd.Parameters.AddWithValue("@id", id);

            cmd.ExecuteNonQuery();
        }
    }
}
