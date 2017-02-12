using dotnetcorereactts.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetcorereactts.Interfaces.EF
{
    public interface IBlogContext
    {
         DbSet<Blog> Blogs { get; set; }
         DbSet<Post> Posts { get; set; }
    }
}