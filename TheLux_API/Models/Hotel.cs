using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TheLux_API.Models
{
    public class Hotel
    {
        public int id { get; set; }
        public string? nome { get; set; }
        public int qtdEstrelas { get; set; }
        public string? localizacao { get; set; }
        public int qtdQuartos { get; set; }
        public double preco { get; set; }
    }
}