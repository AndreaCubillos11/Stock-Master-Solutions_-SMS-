using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tienda_Minorista.Data.Repositores;
using TiendaMinorista.Model;

namespace Tienda_Minorista.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevolucionesController : ControllerBase
    {
        private readonly IDevolucionesRepository _devolucionesRepository;

        public DevolucionesController(IDevolucionesRepository devolucionesRepository)
        {
            _devolucionesRepository = devolucionesRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllDevoluciones()
        {
            return Ok(await _devolucionesRepository.GetAllDevoluciones());
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateDevolucion([FromBody] Devoluciones devolucion)
        {
            if (devolucion == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _devolucionesRepository.insertDevolucion(devolucion);
            return Created("Created", created);
        }

    }
}
