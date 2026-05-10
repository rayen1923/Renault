using back.Models;

namespace back.DAO.IDAO
{
    public interface IAgencyServiceDao
    {
        void AddServiceToAgency(int agencyId, int serviceId);

        void RemoveServiceFromAgency(int agencyId, int serviceId);

        List<Service> GetServicesByAgency(int agencyId);

        List<Agency> GetAgenciesByService(int serviceId);
    }
}