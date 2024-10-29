using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TiendaMinorista.Model
{
    public class Inventarios
    {
        [Key] // Asegúrate de incluir esto
        public int IdInventrio { get; set; }
        public int productoId {  get; set; }

        public int tiendaId { get; set; }

        public int cantidad { get; set; }

        public int cantidadMinima { get; set; }
        public int cantidadBodega { get; set; }

        public string ubicacionTienda { get; set; }

        public DateTime fechaUltimaActualizacion {  get; set; }

    }
}
