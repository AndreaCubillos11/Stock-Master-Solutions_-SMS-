using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tienda_Minorista.Data.Repositores;
using TiendaMinorista.Model;

namespace Tienda_Minorista.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventariosController : ControllerBase
    {
        private readonly IinventariosRepository _inventarioRepository;
        public InventariosController(IinventariosRepository inventarioRepository) { 

            _inventarioRepository = inventarioRepository;
        
        }

        [HttpGet("Tienda/{idTienda}")]
        [Authorize]
        public async Task<IActionResult> GetAllInventario(int idTienda)
        {
            return Ok(await _inventarioRepository.GetAllInventarioPorTienda(idTienda));
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreatedInventario([FromBody] Inventarios inventario)
        {
            if (inventario == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _inventarioRepository.insertInventario(inventario);
            return Created("Created", created);
        }


<<<<<<< HEAD
        [HttpDelete]
=======
        [HttpDelete("inventario/{id}")]
>>>>>>> 83d9bc0 (Configuración básica de CORS, ajuste de rutas y validación de dominio de correo)
        [Authorize]
        public async Task<IActionResult> DeleteInventario(int id)
        {
            await _inventarioRepository.deleteInventario(new Inventarios { IdInventrio = id });

            return NoContent();
        }


        [HttpGet("{codigo}")]
        [Authorize]
<<<<<<< HEAD
        public async Task<IActionResult> GetDetailsInventario(int id)
        {
            return Ok(await _inventarioRepository.GetDetails(id));
=======
        public async Task<IActionResult> GetDetailsInventario(int codigo)
        {
            return Ok(await _inventarioRepository.GetDetails(codigo));
>>>>>>> 83d9bc0 (Configuración básica de CORS, ajuste de rutas y validación de dominio de correo)
        }


        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateInventario([FromBody] Inventarios inventario)
        {
            if (inventario == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _inventarioRepository.updateInventario(inventario);
            return NoContent();
        }
    }
}
