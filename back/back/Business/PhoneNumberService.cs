using back.DAO.IDAO;
using back.Models;

namespace back.Business
{
    public class PhoneNumberService
    {
        private readonly IPhoneNumberDao _dao;

        public PhoneNumberService(IPhoneNumberDao dao)
        {
            _dao = dao;
        }

        public List<PhoneNumber> GetByVehicle(int vehicleId)
            => _dao.GetByVehicle(vehicleId);

        public void Add(PhoneNumber phone)
            => _dao.Add(phone);

        public void Verify(string phone)
            => _dao.Verify(phone);
    }
}