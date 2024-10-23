using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TiendaMinorista.Model
{
    public class Devoluciones
    {
        [Key]  // Esto indica que esta es la clave primaria
        public int DevolucionID { get; set; }

      
        public int ProductoID { get; set; }
        
        public int TiendaID { get; set; }
      
        public int UsuarioID { get; set; }
        public string razon { get; set; }
        public DateTime fechaDevolucion { get; set; }

    }
}
