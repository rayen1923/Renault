namespace back.DAO.IDAO
{
    public interface IRdvDao
    {
        void Create(Rdv rdv);
        List<Rdv> GetAll();
        List<Rdv> GetByAgency(int agencyId);
    }
}
