using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TiendaMinorista.Model
{
   public class Usuarios
    {
        public int Id { get; set; }
        public string Usuario { get; set; }
        public string clave { get; set; }
        public string NombreCompleto {  get; set; }
        public int rol {  get; set; }
        public string correo {  get; set; }
        public DateTime fechaCreacion { get; set; }

        public int idTiendas { get; set; }
    
    }
}
