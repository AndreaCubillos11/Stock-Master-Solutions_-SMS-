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
        [Key]
        public int DevolucionID { get; set; }

        [ForeignKey("ProductoID")]
        public int ProductoID { get; set; }
        [ForeignKey("TiendaID")]
        public int TiendaID { get; set; }
        [ForeignKey("UsuarioID")]
        public int UsuarioID { get; set; }
        public string razon { get; set; }
        public DateTime fechaDevolucion { get; set; }

        public virtual Usuarios Usuario { get; set; }
        public virtual Productos Producto { get; set; }
        public virtual Tiendas Tienda { get; set; }
    }
}
