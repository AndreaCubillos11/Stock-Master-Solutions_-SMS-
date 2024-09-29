using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Mysqlx;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TiendaMinorista.Model;

namespace Tienda_Minorista.Data.Repositores
{
    public class ProductosRepository : IProductosRepository
    {

        private readonly TiendaMinoristaContext _context;

        public ProductosRepository(TiendaMinoristaContext context)
        {
            _context = context;
        }



        async Task<bool> IProductosRepository.deleteProducto(Productos producto)
        {
            // Verificamos si el producto existe en el contexto antes de eliminarlo
            var productoExistente = await _context.Productos.FindAsync(producto.codigoBarras);

            if (productoExistente == null)
            {
                // Si no existe, retornamos false
                return false;
            }

            // Eliminamos el producto del contexto
            _context.Productos.Remove(productoExistente);

            // Guardamos los cambios en la base de datos
            await _context.SaveChangesAsync();

            // Si se elimina correctamente, retornamos true
            return true;
        }

        // Método para obtener todos los productos
        public async Task<IEnumerable<Productos>> GetAllProductos()
        {
            return await _context.Productos.ToListAsync();
        }

        async Task<Productos> IProductosRepository.GetDetailsForCogigo(long codigoBarras)
        {
            // Busca el producto en la base de datos utilizando el código de barras
            var producto = await _context.Productos
                .FirstOrDefaultAsync(p => p.codigoBarras == codigoBarras);

            // Retorna el producto si lo encuentra, o null si no existe
            return producto;
        }

        async Task<bool> IProductosRepository.insertProducto(Productos producto)
        {
            // Agregar el nuevo producto al contexto
            await _context.Productos.AddAsync(producto);

            // Guardar los cambios en la base de datos
            var resultado = await _context.SaveChangesAsync();

            // Si el resultado es mayor que 0, significa que se insertó con éxito
            return resultado > 0;
        }

        
             async Task<bool> IProductosRepository.updateproducto(Productos producto)
        {
            // Verificamos si el producto existe en la base de datos
            var productoExistente = await _context.Productos.FindAsync(producto.Id);

            if (productoExistente == null)
            {
                // Si el producto no existe, retornamos false
                return false;
            }

            // Actualizamos las propiedades del producto existente con los nuevos valores
            _context.Entry(productoExistente).CurrentValues.SetValues(producto);

            // Guardamos los cambios en la base de datos
            var resultado = await _context.SaveChangesAsync();

            // Retornamos true si se actualizó correctamente
            return resultado > 0;

        }

      async  Task<Productos> IProductosRepository.GetDetailsForName(string name)
        {
            var producto = await _context.Productos
                .FirstOrDefaultAsync(p => p.nombre == name);

            // Retorna el producto si lo encuentra, o null si no existe
            return producto;
        }

        async Task<Productos> IProductosRepository.GetDetailsForId(int id)
        {
            var producto = await _context.Productos
                .FirstOrDefaultAsync(p => p.Id == id);

            // Retorna el producto si lo encuentra, o null si no existe
            return producto;
        }
    }
}