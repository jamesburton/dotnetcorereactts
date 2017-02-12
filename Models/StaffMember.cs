namespace dotnetcorereactts.Models
{
    public class StaffMember
    {
        public int Id { get; set; }
        public string FirstNames { get; set; }
        public string Surname { get; set; }
        public bool Hidden { get; set; }
        public string JobTitle { get; set; }
        public string Description { get; set; }
    }
}