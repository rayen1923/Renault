using back.Models;

namespace back.DAO.IDAO
{
    public interface IServiceDao
    {
        List<Service> GetAll();
        Service GetById(int id);
        void Add(Service service);
        void Update(Service service);
        void Delete(int id);
    }
}