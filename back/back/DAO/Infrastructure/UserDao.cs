using back.DAO.IDAO;
using back.Models;
using MySql.Data.MySqlClient;

public class UserDao : IUserDao
{
    private readonly DbConnectionFactory _factory;

    public UserDao(DbConnectionFactory factory)
    {
        _factory = factory;
    }

    public User login(string email, string password)
    {
        using var conn = _factory.CreateConnection();
        conn.Open();

        string query = "SELECT * FROM users WHERE Email=@email AND Password=@password";

        using var cmd = new MySqlCommand(query, conn);
        cmd.Parameters.AddWithValue("@email", email);
        cmd.Parameters.AddWithValue("@password", password);

        using var reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return new User
            {
                Id = Convert.ToInt32(reader["Id"]),
                FullName = reader["FullName"].ToString(),
                Email = reader["Email"].ToString(),
                Password = reader["Password"].ToString()
            };
        }

        return null;
    }
}