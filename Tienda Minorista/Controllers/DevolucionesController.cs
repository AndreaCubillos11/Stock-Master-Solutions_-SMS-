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

    }
}
