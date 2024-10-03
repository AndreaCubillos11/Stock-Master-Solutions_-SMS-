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
        [Authorize(Roles = "2")]
        public async Task<IActionResult> GetAllTiendas()
        {
            return Ok(await _tiendasRepository.GetAllTiendas());
        }

        [HttpGet("tienda/id/{id}")]
        [Authorize(Roles = "2")]
        public async Task<IActionResult> GetTiendaDetails(int id)
        {
            return Ok(await _tiendasRepository.GetDetails(id));
        }

        [HttpPost]
        [Authorize(Roles = "2")]
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
        [Authorize(Roles = "2")]
        public async Task<IActionResult> UpdateTienda([FromBody] Tiendas tienda)
        {
            if (tienda == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _tiendasRepository.updateTienda(tienda);
            return NoContent();
        }

        [HttpDelete]
        [Authorize(Roles = "2")]
        public async Task<IActionResult> DeleteTienda(int id)
        {
            await _tiendasRepository.deleteTienda(new Tiendas { Id = id });

            return NoContent();
        }
    }
}
