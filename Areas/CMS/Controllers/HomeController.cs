using dotnetcorereactts.Models;
using Microsoft.AspNetCore.Mvc;

namespace dotnetcorereactts.Areas.CMS.Controllers
{
    public class HomeController : CMSController
    {
        //public HomeController(ApplicationDbContext db)
        public HomeController(SqliteApplicationDbContext db)
            : base(db)
        {}
    }
}