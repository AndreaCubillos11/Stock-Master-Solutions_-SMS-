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
        public async Task<IActionResult> GetAllProductos()
        {
            return Ok(await _productoRepository.GetAllProductos());
        }

        [HttpGet("{CodigoBarras}")]
        public async Task<IActionResult> GetProductoDetails(long codigoBarras)
        {
            return Ok(await _productoRepository.GetDetails(codigoBarras));
        }


        [HttpPost]
        public async Task<IActionResult> CreatedUsuario([FromBody] Productos producto)
        {
            if (producto == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _productoRepository.insertProducto(producto);
            return Created("Created", created);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            await _productoRepository.deleteProducto(new Productos { codigoBarras = id });

            return NoContent();
        }

        [HttpPut]
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
