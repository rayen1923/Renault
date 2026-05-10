using back.Models;

namespace back.DAO.IDAO
{
    public interface IUserDao
    {
        User login(string email, string password);
    }
}
