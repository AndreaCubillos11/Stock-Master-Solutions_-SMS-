﻿using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using TiendaMinorista.Model;

namespace Tienda_Minorista.Data.Repositores
{
    public class UsuariosRepository : IUsuariosRepository
    {
        private readonly TiendaMinoristaContext _context;

        public UsuariosRepository(TiendaMinoristaContext context)
        {

            _context = context;
        }



        public async Task<bool> deleteUsuario(Usuarios usuario)
        {
            // Verificamos si el usuario existe en el contexto antes de eliminarlo
            var usuarioExistente = await _context.Usuarios.FindAsync(usuario.usuarioId);

            if (usuarioExistente == null)
            {
                // Si no existe, retornamos false
                return false;
            }

            // Eliminamos el producto del contexto
            _context.Usuarios.Remove(usuarioExistente);

            // Guardamos los cambios en la base de datos
            await _context.SaveChangesAsync();

            // Si se elimina correctamente, retornamos true
            return true;
        }


        async Task<IEnumerable<Usuarios>> IUsuariosRepository.GetAllUsuarios()
        {
            return await _context.Usuarios.ToListAsync();
        }

        async Task<Usuarios> IUsuariosRepository.GetDetails(int id)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(p => p.usuarioId == id);

            // Retorna el producto si lo encuentra, o null si no existe
            return usuario;
        }

        public bool ValidarCorreo(string correo)
        {
            // Define la expresión regular para validar los dominios específicos permitidos
            var regex = new Regex(@"^[^@\s]+@(gmail\.com|hotmail\.com|outlook\.com|yahoo\.com|icloud\.com|aol\.com)$", RegexOptions.IgnoreCase);
            return regex.IsMatch(correo);
        }

        async Task<bool> IUsuariosRepository.insertUsuario(Usuarios usuario)
        {
            if (!ValidarCorreo(usuario.correoElectronico))
            {
                throw new Exception("El correo electrónico no es válido.");
            }

            // Encriptar la clave usando bcrypt antes de guardarla
            usuario.contraseña = BCrypt.Net.BCrypt.EnhancedHashPassword(usuario.contraseña);

            // Verificamos si la tienda existe en el contexto 
            var TiendaExistente = await _context.Tiendas.FindAsync(usuario.idTiendas);

            if (TiendaExistente == null)
            {
                // Si no existe, retornamos false
               throw new Exception("Tienda inexistente");
            }

            // Agregar el nuevo usuario al contexto
            await _context.Usuarios.AddAsync(usuario);

            // Guardar los cambios en la base de datos
            var resultado = await _context.SaveChangesAsync();

            // Si el resultado es mayor que 0, significa que la inserción fue exitosa
            return resultado > 0;


        }

        async Task<bool> IUsuariosRepository.updateUsuario(Usuarios usuario)
        {
            // Verificamos si el producto existe en la base de datos
            var usuarioExistente = await _context.Usuarios.FindAsync(usuario.usuarioId);

            if (usuarioExistente == null)
            {
                // Si el usuario no existe, retornamos false
                return false;
            }

            if (!ValidarCorreo(usuario.correoElectronico))
            {
                throw new Exception("El correo electrónico no es válido.");
            }

            // Encriptar la clave usando bcrypt antes de guardarla
            usuario.contraseña = BCrypt.Net.BCrypt.EnhancedHashPassword(usuario.contraseña);

            // Actualizamos las propiedades del producto existente con los nuevos valores
            _context.Entry(usuarioExistente).CurrentValues.SetValues(usuario);

            // Guardamos los cambios en la base de datos
            var resultado = await _context.SaveChangesAsync();

            // Retornamos true si se actualizó correctamente
            return resultado > 0;
        }



        public async Task<object> Login(string usuarioInput, string claveInput)
        {
            // Buscar al usuario en la base de datos por nombre de usuario
            var usuario = await _context.Usuarios
       .FirstOrDefaultAsync(u => u.nombreUsuario == usuarioInput || u.correoElectronico == usuarioInput);

            // Si no se encuentra el usuario o la clave es incorrecta, retornar null
            if (usuario == null || !BCrypt.Net.BCrypt.EnhancedVerify(claveInput, usuario.contraseña))
            {
                throw new Exception("Usuario no logueado");
            }

            // Generar el token JWT usando el TokenService

         TokenService tokenService = new TokenService();
            var token = tokenService.GenerateJwtToken(usuario.usuarioId);

            // Devolver el usuario y el token en un objeto anónimo
            return new
            {
                user = usuario,
                accessToken = token
            };
        }

    }


}

