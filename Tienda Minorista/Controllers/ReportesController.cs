using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tienda_Minorista.Data.Repositores;
using TiendaMinorista.Model;

namespace Tienda_Minorista.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportesController : ControllerBase
    {
        private readonly IReportesRepository _reportesRepository;

        public ReportesController(IReportesRepository reportesRepository)
        {
            _reportesRepository = reportesRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllReportes()
        {
            return Ok(await _reportesRepository.GetAllReportes());
        }

        [HttpGet("reporte/id/{id}")]
        [Authorize]
        public async Task<IActionResult> GetDetailsReporte(int id)
        {
            return Ok(await _reportesRepository.GetDetails(id));
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateReporte([FromBody] Reportes reporte)
        {
            if (reporte == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
<<<<<<< HEAD
            try
            {
                var created = await _reportesRepository.insertReporte(reporte);
                return Created("Created", created);
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
=======
            
           
                var created = await _reportesRepository.insertReporte(reporte);
                return Created("Created", created);
         
          
>>>>>>> 83d9bc0 (Configuración básica de CORS, ajuste de rutas y validación de dominio de correo)
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateReporte([FromBody] Reportes reporte)
        {
            if (reporte == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _reportesRepository.updateReporte(reporte);
            return NoContent();
        }

<<<<<<< HEAD
        [HttpDelete]
=======
        [HttpDelete("reporte/{id}")]
>>>>>>> 83d9bc0 (Configuración básica de CORS, ajuste de rutas y validación de dominio de correo)
        [Authorize]
        public async Task<IActionResult> DeleteReporte(int id)
        {
            await _reportesRepository.deleteReporte(new Reportes { ReporteID = id });

            return NoContent();
        }
    }
}
