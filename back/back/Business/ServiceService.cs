using back.DAO.IDAO;
using back.Models;

namespace back.Business
{
    public class ServiceService
    {
        private readonly IServiceDao _dao;

        public ServiceService(IServiceDao dao)
        {
            _dao = dao;
        }

        public List<Service> GetAll() => _dao.GetAll();

        public Service GetById(int id) => _dao.GetById(id);

        public void Add(Service s) => _dao.Add(s);

        public void Update(Service s) => _dao.Update(s);

        public void Delete(int id) => _dao.Delete(id);
    }
}
