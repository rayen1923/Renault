using back.Models;

namespace back.DAO.IDAO
{
    public interface IVehicleDao
    {
        Vehicle Login(string serie, string chassisNumber);
        List<Vehicle> GetAll();
        void Add(Vehicle v);
    }
}