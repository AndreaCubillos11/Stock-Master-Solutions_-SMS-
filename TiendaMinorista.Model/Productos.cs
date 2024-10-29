using System;
using System.Collections.Generic;
<<<<<<< HEAD
=======
using System.ComponentModel.DataAnnotations;
>>>>>>> 83d9bc0 (Configuración básica de CORS, ajuste de rutas y validación de dominio de correo)
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TiendaMinorista.Model
{
    public class Productos
    {
<<<<<<< HEAD
        public int Id { get; set; }
        public long codigoBarras { get; set; }
        public string nombre { get; set; }
=======

        [Key]  // Esto indica que esta es la clave primaria
        public int productoId { get; set; }
        public long codigoBarras { get; set; }
        public string nombreProducto { get; set; }
>>>>>>> 83d9bc0 (Configuración básica de CORS, ajuste de rutas y validación de dominio de correo)
        public string descripcion { get; set; }
        public int precio { get; set; }
        public string categoria { get; set; }
        public DateTime fechaIngreso { get; set; }

        
    }
}
