using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TiendaMinorista.Model;

namespace Tienda_Minorista.Data.Repositores
{
    public interface IUsuariosRepository
    {
        Task<IEnumerable<Usuarios>> GetAllUsuarios();
        Task<Usuarios> GetDetails(int id);
        Task<bool> insertUsuario(Usuarios usuario);
        Task<bool> updateUsuario(Usuarios usuario);
        Task<bool> deleteUsuario(Usuarios usuario);
        Task<object> Login(string usuario, string clave);
        Task<Usuarios> GetforCorreo(string correo);
    }
}
