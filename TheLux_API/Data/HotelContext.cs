using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TheLux_API.Models;
using System.Diagnostics.CodeAnalysis;

namespace TheLux_API.Data
{
    public class HotelContext : DbContext
    {
        protected readonly IConfiguration Configuration;
        public HotelContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server with connection string from app settings
            options.UseSqlServer(Configuration.GetConnectionString("StringConexaoSQLServer"));
        }

         public DbSet<Hotel>? Hotel {get; set;}
         public DbSet<User>? UsuarioHotel { get; set; }
    }
}