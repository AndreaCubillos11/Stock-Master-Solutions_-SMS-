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
        [Key]
        public int Id { get; set; }
        public long codigoBarras { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public decimal precio { get; set; }
        public string categoria { get; set; }
        public DateTime fechaIngreso { get; set; }

        
    }
}
