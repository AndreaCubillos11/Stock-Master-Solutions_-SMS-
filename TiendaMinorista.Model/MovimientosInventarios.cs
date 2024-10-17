using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TiendaMinorista.Model
{
    public class MovimientosInventarios 
    {
        public int IdMovimiento { get; set; } 

        public int inventarioId {  get; set; }
        public  string TipoMovimiento { get; set; }
        public int cantidad {  get; set; }
        public DateTime FechaMovimiento { get; set; }

        public int UsuarioId { get; set; }

    }
}
