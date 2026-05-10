using back.DAO.IDAO;

namespace back.Business
{
    public class OtpService
    {
        private readonly IOtpDao _dao;
        private readonly PhoneNumberService _phoneService;

        public OtpService(
            IOtpDao dao,
            PhoneNumberService phoneService)
        {
            _dao = dao;
            _phoneService = phoneService;
        }

        public string Send(string phone)
        {
            var code = new Random()
                .Next(100000, 999999)
                .ToString();

            _dao.SaveCode(phone, code);

            return code;
        }

        public bool Verify(string phone, string code)
        {
            var ok = _dao.VerifyCode(phone, code);

            if (ok)
                _phoneService.Verify(phone);

            return ok;
        }
    }
}