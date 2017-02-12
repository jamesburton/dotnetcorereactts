using dotnetcorereactts.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Newtonsoft.Json;
using System;

namespace dotnetcorereactts.Areas.CMS.Controllers
{
    public class StaffMemberController : CMSController
    {
        public StaffMemberController(SqliteApplicationDbContext db)
            : base(db)
        {

        }

        public ViewResult Index() {
            var staff = Db.StaffMembers.ToList();
            return View(staff);
        }

        [HttpGet]
        public ViewResult Create() {
            return View();
        }

        [HttpPost]
        public ActionResult Create(StaffMember staffMember) {
            //throw new Exception(JsonConvert.SerializeObject(staffMember));
            if(ModelState.IsValid) {
                Db.StaffMembers.Add(staffMember);
                Db.SaveChanges();
                // TODO: Consider adding caching and memory to enable TempData usage:
                // See http://stackoverflow.com/a/33814635
                //TempData["Message"] = "New staff member saved as #" + staffMember.Id;
                return RedirectToAction("Index");
            }
            return View(staffMember);
        }
    }
}