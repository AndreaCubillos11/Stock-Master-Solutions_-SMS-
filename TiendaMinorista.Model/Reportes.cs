using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TiendaMinorista.Model
{
    public class Reportes
    {
        [Key]
        public int ReporteID { get; set; }
        public string tipoReporte { get; set; }
        public DateTime fechaGeneracion { get; set; }
        [ForeignKey("UsuarioID")]
        public int UsuarioID { get; set; }
        public string contenidoReporte { get; set; }
        
        public virtual Usuarios Usuario { get; set; }
    }
}
