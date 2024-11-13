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

        [HttpGet("Inventario/{idInventario}")]
        [Authorize]
        public async Task<IActionResult> GetAllMovimientosPorIdInventario(int idInventario)
        {
            return Ok(await _Movimientos.GetAllMoviientosPorIdInvetario(idInventario));
        }

        [HttpGet("Usuario/{idUsuario}")]
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


        [HttpGet("productoMasVendido/{idTienda}")]
       
        public async Task<IActionResult> GetAllProductosMasVendidos(int idTienda)
        {
            return Ok(await _Movimientos.GetProductosMasVendidosPorTiendaAsync(idTienda));
        }

        [HttpGet("productoMenosVendido/{idTienda}")]

        public async Task<IActionResult> GetAllProductosMenosVendidos(int idTienda)
        {
            return Ok(await _Movimientos.GetProductosMenosVendidosPorTiendaAsync(idTienda));
        }

    }
}
