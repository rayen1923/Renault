using MySql.Data.MySqlClient;

public class DbConnectionFactory
{
    private readonly IConfiguration _config;

    public DbConnectionFactory(IConfiguration config)
    {
        _config = config;
    }

    public MySqlConnection CreateConnection()
    {
        return new MySqlConnection(
            _config.GetConnectionString("DefaultConnection")
        );
    }
}