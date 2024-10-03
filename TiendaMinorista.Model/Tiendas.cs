using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TiendaMinorista.Model
{
    public class Tiendas
    {
        public int Id { get; set; }
        public string tienda { get; set; }
        public string direccion { get; set; }
        public string telefono { get; set; }
        public int gerenteId { get; set; }
    }
}
