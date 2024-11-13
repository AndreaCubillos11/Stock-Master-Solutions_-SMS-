using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TiendaMinorista.Model
{
    public class Productos
    {

        [Key]  // Esto indica que esta es la clave primaria
        public int productoId { get; set; }
        public long codigoBarras { get; set; }
        public string nombreProducto { get; set; }
        public string descripcion { get; set; }
        public int precio { get; set; }
        public string categoria { get; set; }
        public DateTime fechaIngreso { get; set; }

        public string urlImage { get; set; }



    }
}
