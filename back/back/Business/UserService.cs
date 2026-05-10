using back.DAO.IDAO;
using back.Models;

public class UserService
{
    private readonly IUserDao _dao;

    public UserService(IUserDao dao)
    {
        _dao = dao;
    }

    public User Login(string email, string password)
    {
        return _dao.login(email, password);
    }
}