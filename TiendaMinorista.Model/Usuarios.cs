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
   public class Usuarios
    {
<<<<<<< HEAD
        public int Id { get; set; }
        public string Usuario { get; set; }
        public string clave { get; set; }
        public string NombreCompleto {  get; set; }
        public int rol {  get; set; }
        public string correo {  get; set; }
=======
        [Key] // Asegúrate de incluir esto
        public int usuarioId { get; set; }
        public string nombreUsuario { get; set; }
        public string contraseña { get; set; }
        public string NombreCompleto {  get; set; }
        public int rol {  get; set; }
        public string correoElectronico {  get; set; }
>>>>>>> 83d9bc0 (Configuración básica de CORS, ajuste de rutas y validación de dominio de correo)
        public DateTime fechaCreacion { get; set; }

        public int idTiendas { get; set; }
    
    }
}
