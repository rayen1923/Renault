using back.DAO.IDAO;
using back.Models;

namespace back.Business
{
    public class VehicleService
    {
        private readonly IVehicleDao _dao;

        public VehicleService(IVehicleDao dao)
        {
            _dao = dao;
        }

        public Vehicle Login(string serie, string chassis)
            => _dao.Login(serie, chassis);

        public List<Vehicle> GetAll()
            => _dao.GetAll();

        public void Add(Vehicle v)
            => _dao.Add(v);
    }
}