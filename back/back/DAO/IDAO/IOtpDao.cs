namespace back.DAO.IDAO
{
    public interface IOtpDao
    {
        void SaveCode(string phone, string code);
        bool VerifyCode(string phone, string code);
    }
}