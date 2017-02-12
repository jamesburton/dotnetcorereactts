using Microsoft.EntityFrameworkCore;

namespace dotnetcorereactts.Models
{
    public class SqliteApplicationDbContext
        : BaseApplicationDbContext
    {
        // TODO: Move db connection details to config files
        //const string DbFilename = "~/App_Data/Application.db";
        const string DbFilename = "./Application.db";
        string SqliteConnectionString => $"Filename={DbFilename}";

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(SqliteConnectionString);
        }
    }
}