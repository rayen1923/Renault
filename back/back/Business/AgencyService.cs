using back.Models;
using back.DAO.IDAO;

namespace back.Business
{
    public class AgencyService
    {
        private readonly IAgencyDao _dao;

        public AgencyService(IAgencyDao dao)
        {
            _dao = dao;
        }

        public List<Agency> GetAll() => _dao.GetAll();

        public Agency GetById(int id) => _dao.GetById(id);

        public void Add(Agency a) => _dao.Add(a);

        public void Update(Agency a) => _dao.Update(a);

        public void Delete(int id) => _dao.Delete(id);
    }
}