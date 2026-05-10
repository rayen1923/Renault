using back.Models;
using back.DAO.IDAO;
using MySql.Data.MySqlClient;

namespace back.DAO
{
    public class AgencyDao : IAgencyDao
    {
        private readonly DbConnectionFactory _factory;

        public AgencyDao(DbConnectionFactory factory)
        {
            _factory = factory;
        }

        public List<Agency> GetAll()
        {
            var list = new List<Agency>();

            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand("SELECT * FROM agencies", conn);
            var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                list.Add(new Agency
                {
                    Id = Convert.ToInt32(reader["Id"]),
                    Name = reader["Name"].ToString(),
                    Address = reader["Address"].ToString(),
                    Email = reader["Email"].ToString(),
                    Phone = reader["Phone"].ToString()
                });
            }

            return list;
        }

        public Agency GetById(int id)
        {
            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand("SELECT * FROM agencies WHERE Id=@id", conn);
            cmd.Parameters.AddWithValue("@id", id);

            var reader = cmd.ExecuteReader();

            if (reader.Read())
            {
                return new Agency
                {
                    Id = Convert.ToInt32(reader["Id"]),
                    Name = reader["Name"].ToString(),
                    Address = reader["Address"].ToString(),
                    Email = reader["Email"].ToString(),
                    Phone = reader["Phone"].ToString()
                };
            }

            return null;
        }

        public void Add(Agency a)
        {
            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand(
                "INSERT INTO agencies(Name, Address, Email, Phone) VALUES(@n,@a,@e,@p)", conn);

            cmd.Parameters.AddWithValue("@n", a.Name);
            cmd.Parameters.AddWithValue("@a", a.Address);
            cmd.Parameters.AddWithValue("@e", a.Email);
            cmd.Parameters.AddWithValue("@p", a.Phone);

            cmd.ExecuteNonQuery();
        }

        public void Update(Agency a)
        {
            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand(@"
                UPDATE agencies 
                SET Name=@n, Address=@a, Email=@e, Phone=@p
                WHERE Id=@id", conn);

            cmd.Parameters.AddWithValue("@id", a.Id);
            cmd.Parameters.AddWithValue("@n", a.Name);
            cmd.Parameters.AddWithValue("@a", a.Address);
            cmd.Parameters.AddWithValue("@e", a.Email);
            cmd.Parameters.AddWithValue("@p", a.Phone);

            cmd.ExecuteNonQuery();
        }

        public void Delete(int id)
        {
            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand("DELETE FROM agencies WHERE Id=@id", conn);
            cmd.Parameters.AddWithValue("@id", id);

            cmd.ExecuteNonQuery();
        }
    }
}