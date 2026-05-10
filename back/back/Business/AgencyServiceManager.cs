using back.DAO.IDAO;
using back.Models;

namespace back.Business
{
    public class AgencyServiceManager
    {
        private readonly IAgencyServiceDao _dao;

        public AgencyServiceManager(IAgencyServiceDao dao)
        {
            _dao = dao;
        }

        public void AddServiceToAgency(int agencyId, int serviceId)
            => _dao.AddServiceToAgency(agencyId, serviceId);

        public void RemoveServiceFromAgency(int agencyId, int serviceId)
            => _dao.RemoveServiceFromAgency(agencyId, serviceId);

        public List<Service> GetServicesByAgency(int agencyId)
            => _dao.GetServicesByAgency(agencyId);

        public List<Agency> GetAgenciesByService(int serviceId)
            => _dao.GetAgenciesByService(serviceId);
    }
}