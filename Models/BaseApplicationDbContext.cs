using dotnetcorereactts.Interfaces.EF;
using Microsoft.EntityFrameworkCore;

namespace dotnetcorereactts.Models
{
    public abstract class BaseApplicationDbContext
        : DbContext
        , IApplicationDbContext
    {
        #region IBlogContext
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Post> Posts { get; set; }
        #endregion IBlogContext

        #region IStaffContext
        public DbSet<StaffMember> StaffMembers { get; set; }
        #endregion IStaffContext
    }
}