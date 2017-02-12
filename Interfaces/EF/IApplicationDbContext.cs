using Microsoft.EntityFrameworkCore;

namespace dotnetcorereactts.Interfaces.EF
{
    public interface IApplicationDbContext
        : IStaffContext
        , IBlogContext
    {
        DbSet<T> Set<T>() where T : class;
        int SaveChanges();
    }
}