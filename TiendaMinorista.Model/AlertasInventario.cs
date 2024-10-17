using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TiendaMinorista.Model
{
    public class AlertasInventario
    {
        public int idAlerta {  get; set; }
        public int inventarioId { get; set; }
        public DateTime  fechaAlerta {  get; set; }
        public string descripcion { get; set; }
        public string estado { get; set; }

    }
}
