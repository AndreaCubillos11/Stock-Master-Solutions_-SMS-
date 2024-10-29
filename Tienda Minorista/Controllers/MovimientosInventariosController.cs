using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tienda_Minorista.Data.Repositores;

namespace Tienda_Minorista.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovimientosInventariosController : ControllerBase
    {
        private readonly IMovimientosInventarios _Movimientos;

        public MovimientosInventariosController(IMovimientosInventarios movimientos)
        {
            _Movimientos = movimientos;
        }

<<<<<<< HEAD
        [HttpGet("Inventario/{id}")]
=======
        [HttpGet("Inventario/{idInventario}")]
>>>>>>> 83d9bc0 (Configuración básica de CORS, ajuste de rutas y validación de dominio de correo)
        [Authorize]
        public async Task<IActionResult> GetAllMovimientosPorIdInventario(int idInventario)
        {
            return Ok(await _Movimientos.GetAllMoviientosPorIdInvetario(idInventario));
        }

<<<<<<< HEAD
        [HttpGet("Usuario/{id}")]
=======
        [HttpGet("Usuario/{idUsuario}")]
>>>>>>> 83d9bc0 (Configuración básica de CORS, ajuste de rutas y validación de dominio de correo)
        [Authorize]
        public async Task<IActionResult> GetAllMovimientosPorIdUsuario(int idUsuario)
        {
            return Ok(await _Movimientos.GetAllMoviientosPorIdUsuario(idUsuario));
        }


        [HttpGet("TipoMovimiento/{TipoMovimieto}")]
        [Authorize]
        public async Task<IActionResult> GetAllPorTipoMovimiento(string TipoMovimieto)
        {
            return Ok(await _Movimientos.GetAllMoviientosPorTipoMovimiento(TipoMovimieto));
        }

    }
}
