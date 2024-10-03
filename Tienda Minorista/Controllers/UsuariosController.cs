using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Tienda_Minorista.Data.Repositores;
using TiendaMinorista.Model;


namespace Tienda_Minorista.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuariosRepository _usuariosRepository;

        public UsuariosController(IUsuariosRepository usuariosRepository)
        {
            _usuariosRepository = usuariosRepository;
        }


        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllUsuarios()
        {
            return Ok(await _usuariosRepository.GetAllUsuarios());
        }

        [HttpGet("usuario/id/{id}")]
        [Authorize]
        public async Task<IActionResult> GetUsuariosDetails(int id)
        {
            return Ok(await _usuariosRepository.GetDetails(id));
        }

        [HttpPost]
        //[Authorize]

        public async Task<IActionResult> CreatedUsuario([FromBody] Usuarios usuarios)
        {
            if (usuarios == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _usuariosRepository.insertUsuario(usuarios);
            return Created("Created", created);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateUsuario([FromBody] Usuarios usuarios)
        {
            if (usuarios == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _usuariosRepository.updateUsuario(usuarios);
            return NoContent();
        }

        [HttpDelete]
        [Authorize]

        public async Task<IActionResult> DeleteUsuario(int id)
        {
            await _usuariosRepository.deleteUsuario(new Usuarios { Id = id });

            return NoContent();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] TiendaMinorista.Model.LoginRequest request)
        {
            try
            {
                var result = await _usuariosRepository.Login(request.Usuario, request.clave);
                return Ok(result); // Devuelve el resultado, que debería incluir el usuario y el token
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = ex.Message }); // Manejo de errores
            }
        }

    }
}
