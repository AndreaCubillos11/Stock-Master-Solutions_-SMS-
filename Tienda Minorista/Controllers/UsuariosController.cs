using Microsoft.AspNetCore.Http;
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
        public async Task<IActionResult> GetAllUsuarios()
        {
            return Ok(await _usuariosRepository.GetAllUsuarios());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsuariosDetails(int id)
        {
            return Ok(await _usuariosRepository.GetDetails(id));
        }

        [HttpPost]
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
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            await _usuariosRepository.deleteUsuario(new Usuarios { Id = id });

            return NoContent();
        }

        [HttpGet("{usuario,clave}")]
        public async Task<IActionResult> Login( string usuario,string clave)
        {
            await _usuariosRepository.Login(usuario, clave);

            return Ok(await _usuariosRepository.Login(usuario,clave));
        }
    }
}
