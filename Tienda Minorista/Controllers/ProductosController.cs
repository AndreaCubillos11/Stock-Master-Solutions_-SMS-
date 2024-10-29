using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tienda_Minorista.Data.Repositores;
using TiendaMinorista.Model;

namespace Tienda_Minorista.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly IProductosRepository _productoRepository;

        public ProductosController(IProductosRepository productoRepository)
        {
            _productoRepository = productoRepository;
        }

        [HttpGet]
        [Authorize]

        public async Task<IActionResult> GetAllProductos()
        {
            return Ok(await _productoRepository.GetAllProductos());
        }

        [HttpGet("producto/id/{id}")]
        [Authorize]
        public async Task<IActionResult> GetProductoDetailsForId(int id)
        {
            return Ok(await _productoRepository.GetDetailsForId(id));
        }

        [HttpGet("producto/codigo/{codigoBarras}")]
        [Authorize]
        public async Task<IActionResult> GetProductoDetailsForCodigo(long codigoBarras)
        {
            return Ok(await _productoRepository.GetDetailsForCogigo(codigoBarras));
        }

        [HttpGet("producto/nombre/{nombre}")]
        [Authorize]
        public async Task<IActionResult> GetProductoDetailsForName(string nombre)
        {
            return Ok(await _productoRepository.GetDetailsForName(nombre));
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreatedUsuario([FromBody] Productos producto)
        {
            if (producto == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _productoRepository.insertProducto(producto);
            return Created("Created", created);
        }

        [HttpDelete("codigoBarras/{codigoBarras}")]
        [Authorize]
        public async Task<IActionResult> DeleteProducto(long codigoBarras)
        {
            await _productoRepository.deleteProducto(new Productos { codigoBarras = codigoBarras });

            return NoContent();
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateProducto([FromBody] Productos producto)
        {
            if (producto == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _productoRepository.updateproducto(producto);
            return NoContent();
        }
    }
}
