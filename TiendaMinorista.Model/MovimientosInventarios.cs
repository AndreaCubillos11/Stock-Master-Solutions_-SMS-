using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TiendaMinorista.Model
{
    public class MovimientosInventarios 
    {
        [Key]  // Esto indica que esta es la clave primaria
        public int IdMovimiento { get; set; } 

        public int inventarioId {  get; set; }
        public  string TipoMovimiento { get; set; }
        public int cantidad {  get; set; }
        public DateTime FechaMovimiento { get; set; }

        public int UsuarioId { get; set; }

    }
}
