using dotnetcorereactts.Models;
using Microsoft.EntityFrameworkCore;
namespace dotnetcorereactts.Interfaces.EF
{
    public interface IStaffContext
    {
         DbSet<StaffMember> StaffMembers { get; }
    }
}