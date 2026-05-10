using back.Models;

public interface IAgencyDao
{
    List<Agency> GetAll();
    Agency GetById(int id);
    void Add(Agency agency);
    void Update(Agency agency);
    void Delete(int id);
}