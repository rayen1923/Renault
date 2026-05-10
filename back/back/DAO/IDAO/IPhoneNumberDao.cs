using back.Models;

namespace back.DAO.IDAO
{
    public interface IPhoneNumberDao
    {
        List<PhoneNumber> GetByVehicle(int vehicleId);

        void Add(PhoneNumber phone);

        void Verify(string phoneNumber);
    }
}
