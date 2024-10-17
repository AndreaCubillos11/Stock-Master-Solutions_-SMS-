using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tienda_Minorista.Data.Repositores;

namespace Tienda_Minorista.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlertasInventarioController : ControllerBase
    {
        private readonly IAlertasInventario _AlertasRepository;
         public AlertasInventarioController (IAlertasInventario AlertasRepository) { 
            
            _AlertasRepository = AlertasRepository;
        }


        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllAlertas()
        {
            return Ok(await _AlertasRepository.GetAllAlertas());
        }

        [HttpGet("Alerta/id/{id}")]
        [Authorize]
        public async Task<IActionResult> GetDetailsAlerta(int id)
        {
            return Ok(await _AlertasRepository.GetDetailsAlerta(id));
        }

        [HttpGet("Alerta/Inventario/{id}")]
        [Authorize]
        public async Task<IActionResult> GetAllAlertasActivasPorTienda(int id)
        {
            return Ok(await _AlertasRepository.GetAllAlertasActivasPorInventario(id));
        }

    }
}
