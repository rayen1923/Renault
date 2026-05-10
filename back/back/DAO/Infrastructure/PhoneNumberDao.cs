using MySql.Data.MySqlClient;
using back.Models;
using back.DAO.IDAO;

namespace back.DAO.Infrastructure
{
    public class PhoneNumberDao : IPhoneNumberDao
    {
        private readonly DbConnectionFactory _factory;

        public PhoneNumberDao(DbConnectionFactory factory)
        {
            _factory = factory;
        }

        public List<PhoneNumber> GetByVehicle(int vehicleId)
        {
            var list = new List<PhoneNumber>();

            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand(
                "SELECT * FROM phonenumbers WHERE VehicleId=@v",
                conn);

            cmd.Parameters.AddWithValue("@v", vehicleId);

            var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                list.Add(new PhoneNumber
                {
                    Id = Convert.ToInt32(reader["Id"]),
                    VehicleId = Convert.ToInt32(reader["VehicleId"]),
                    PhoneNumberValue = reader["PhoneNumber"].ToString(),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"])
                });
            }

            return list;
        }

        public void Add(PhoneNumber phone)
        {
            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand(
                @"INSERT INTO phonenumbers
                (VehicleId, PhoneNumber)
                VALUES(@v,@p)", conn);

            cmd.Parameters.AddWithValue("@v", phone.VehicleId);
            cmd.Parameters.AddWithValue("@p", phone.PhoneNumberValue);

            cmd.ExecuteNonQuery();
        }

        public void Verify(string phoneNumber)
        {
            using var conn = _factory.CreateConnection();
            conn.Open();

            var cmd = new MySqlCommand(
                @"UPDATE phonenumbers
                  SET IsVerified=1
                  WHERE PhoneNumber=@p",
                conn);

            cmd.Parameters.AddWithValue("@p", phoneNumber);

            cmd.ExecuteNonQuery();
        }
    }
}