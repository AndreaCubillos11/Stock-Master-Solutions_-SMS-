using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tienda_Minorista.Data.Repositores;
using TiendaMinorista.Model;

namespace Tienda_Minorista.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiendasController : ControllerBase
    {
        private readonly ITiendasRepository _tiendasRepository;

        public TiendasController(ITiendasRepository tiendasRepository)
        {
            _tiendasRepository = tiendasRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllTiendas()
        {
            return Ok(await _tiendasRepository.GetAllTiendas());
        }

<<<<<<< HEAD
        [HttpGet("tienda/id/{id}")]
=======
        [HttpGet("tienda/{id}")]
>>>>>>> 83d9bc0 (Configuración básica de CORS, ajuste de rutas y validación de dominio de correo)
        [Authorize]
        public async Task<IActionResult> GetTiendaDetails(int id)
        {
            return Ok(await _tiendasRepository.GetDetails(id));
        }

        [HttpPost]
        [Authorize]

        public async Task<IActionResult> CreatedTienda([FromBody] Tiendas tienda)
        {
            if (tienda == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _tiendasRepository.insertTienda(tienda);
            return Created("Created", created);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateTienda([FromBody] Tiendas tienda)
        {
            if (tienda == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _tiendasRepository.updateTienda(tienda);
            return NoContent();
        }

<<<<<<< HEAD
        [HttpDelete]
=======
        [HttpDelete("tienda/{id}")]

>>>>>>> 83d9bc0 (Configuración básica de CORS, ajuste de rutas y validación de dominio de correo)
        [Authorize]
        public async Task<IActionResult> DeleteTienda(int id)
        {
            await _tiendasRepository.deleteTienda(new Tiendas { Id = id });

            return NoContent();
        }
    }
}
