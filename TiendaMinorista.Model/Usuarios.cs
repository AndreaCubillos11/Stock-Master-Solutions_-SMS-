using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TiendaMinorista.Model
{
   public class Usuarios
    {
        [Key] // Asegúrate de incluir esto
        public int usuarioId { get; set; }
        public string nombreUsuario { get; set; }
        public string contraseña { get; set; }
        public string NombreCompleto {  get; set; }
        public int rol {  get; set; }
        public string correoElectronico {  get; set; }
        public DateTime fechaCreacion { get; set; }

        public int idTiendas { get; set; }
    
    }
}
