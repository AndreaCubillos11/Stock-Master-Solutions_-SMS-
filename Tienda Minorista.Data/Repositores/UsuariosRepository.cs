using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TiendaMinorista.Model;
using BCrypt.Net;

namespace Tienda_Minorista.Data.Repositores
{
    public class UsuariosRepository : IUsuariosRepository
    {
        private readonly AzureConfiguration _connectionString;

       public UsuariosRepository(AzureConfiguration connectionString) { 
        _connectionString = connectionString;
        }

        protected SqlConnection dbconnection()
        {
            return new SqlConnection(_connectionString.conectionString);
        }

        public async Task<bool> deleteUsuario(Usuarios usuario)
        {
            var db = dbconnection();
            var sql = "Delete from Usuarios where id=@Id";
            var result = await db.ExecuteAsync(sql , new {Id=usuario.Id});
            return result > 0;
        }


        Task<IEnumerable<Usuarios>> IUsuariosRepository.GetAllUsuarios()
        {
            var db=dbconnection();
            var sql = "Select Id,Usuario,Clave,NombreCompleto,rol,correo,fechaCreacion from Usuarios" ;

            return db.QueryAsync<Usuarios>(sql, new { });
        }

        Task<Usuarios> IUsuariosRepository.GetDetails(int id)
        {
            var db = dbconnection();
            var sql = "Select Id,Usuario,Clave,NombreCompleto,rol,correo,fechaCreacion from Usuarios where=@Id";

            return db.QueryFirstOrDefaultAsync<Usuarios>(sql, new {Id =id });
        }

        async Task<bool> IUsuariosRepository.insertUsuario(Usuarios usuario)
        {
            var db = dbconnection();

            // Encriptar la clave usando bcrypt
            usuario.clave = BCrypt.Net.BCrypt.EnhancedHashPassword(usuario.clave);

            var sql = "Insert into Usuarios( Id,Usuario,Clave,NombreCompleto,rol,correo,fechaCreacion)" +
                      " Values (@Id,@Usuario,@Clave,@NombreCompleto,@rol,@correo,@fechaCreacion)";

            var result = await db.ExecuteAsync(sql, new
            {
                usuario.Id,
                usuario.Usuario,
                usuario.clave, 
                usuario.NombreCompleto,
                usuario.rol,
                usuario.correo,
                usuario.fechaCreacion
            });

            return result > 0;
        }

        async Task<bool> IUsuariosRepository.updateUsuario(Usuarios usuario)
        {
            var db = dbconnection();
            var sql = "update Usuarios set Id=@Id," +
                "Usuario= @Usuario ," +
                "Clave=@Clave," +
                "NombreCompleto=@NombreCompleto," +
                "rol=@rol," +
                "correo=@correo," +
                "fechaCreacion=@fechaCreacion where id=@Id" ;

            var result = await db.ExecuteAsync(sql, new
            { usuario.Id, usuario.Usuario, usuario.clave, usuario.NombreCompleto, usuario.rol, usuario.correo, usuario.fechaCreacion });
            return result > 0;
        }

      

public async Task<Usuarios> Login(string usuarioInput, string claveInput)
    {
        var db = dbconnection();

        var sql = "SELECT * FROM Usuarios WHERE Usuario = @Usuario";

        var usuario = await db.QueryFirstOrDefaultAsync<Usuarios>(sql, new { Usuario = usuarioInput });

        if (usuario == null || !BCrypt.Net.BCrypt.Verify(claveInput, usuario.clave))
        {
            // Usuario no encontrado o contraseña incorrecta
            return null;
        }

        // Login exitoso, devolver el usuario
        return usuario;
    }


}


}
  
