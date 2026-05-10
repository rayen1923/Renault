using back.DAO.IDAO;
using back.Models;

namespace back.Business
{
    public class RdvService
    {
        private readonly IRdvDao _dao;

        public RdvService(IRdvDao dao)
        {
            _dao = dao;
        }

        public void Create(CreateRdvDto dto)
        {
            var rdv = new Rdv
            {
                VehicleId = dto.VehicleId,
                PhoneNumberId = dto.PhoneNumberId,
                ServiceId = dto.ServiceId,
                AgencyId = dto.AgencyId,
                AppointmentDate = dto.AppointmentDate,
                AppointmentTime = dto.AppointmentTime
            };

            _dao.Create(rdv);
        }

        public List<Rdv> GetAll()
        {
            return _dao.GetAll();
        }

        public List<Rdv> GetByAgency(int agencyId)
        {
            return _dao.GetByAgency(agencyId);
        }
    }
}
