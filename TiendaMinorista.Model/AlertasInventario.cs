using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TiendaMinorista.Model
{
    public class AlertasInventario
    {
        [Key]  // Esto indica que esta es la clave primaria
        public int idAlerta {  get; set; }
        public int inventarioId { get; set; }
        public DateTime  fechaAlerta {  get; set; }
        public string descripcion { get; set; }
        public string estado { get; set; }

    }
}
