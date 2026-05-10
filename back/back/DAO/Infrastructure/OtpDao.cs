using MySql.Data.MySqlClient;
using back.DAO.IDAO;

namespace back.DAO.Infrastructure
{
    public class OtpDao : IOtpDao
    {
        private readonly DbConnectionFactory _factory;

        public OtpDao(DbConnectionFactory factory)
        {
            _factory = factory;
        }

        public void SaveCode(string phone, string code)
        {
            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand(
                @"INSERT INTO otpcode
                (PhoneNumber, Code, ExpiresAt)
                VALUES(@p,@c,@e)", conn);

            cmd.Parameters.AddWithValue("@p", phone);
            cmd.Parameters.AddWithValue("@c", code);
            cmd.Parameters.AddWithValue("@e",
                DateTime.Now.AddMinutes(5));

            cmd.ExecuteNonQuery();
        }

        public bool VerifyCode(string phone, string code)
        {
            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand(
                @"SELECT COUNT(*)
                  FROM otpcode
                  WHERE PhoneNumber=@p
                  AND Code=@c
                  AND ExpiresAt > NOW()",
                conn);

            cmd.Parameters.AddWithValue("@p", phone);
            cmd.Parameters.AddWithValue("@c", code);

            int count =
                Convert.ToInt32(cmd.ExecuteScalar());

            return count > 0;
        }
    }
}