using dotnetcorereactts.Interfaces.EF;
using dotnetcorereactts.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace dotnetcorereactts.Areas.CMS.Controllers
{
    [Area("CMS")]
    //[Authorize(Roles="Admin")]
    public abstract class CMSController : Controller
    {
        protected IApplicationDbContext Db;
        protected CMSController(IApplicationDbContext db)
        {
            Db = db;
        }
    }
}