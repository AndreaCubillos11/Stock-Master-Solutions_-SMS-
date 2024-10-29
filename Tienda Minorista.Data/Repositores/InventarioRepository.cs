using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TiendaMinorista.Model;

namespace Tienda_Minorista.Data.Repositores
{
    public class InventarioRepository : IinventariosRepository
    {
        private readonly TiendaMinoristaContext _context;
        public InventarioRepository(TiendaMinoristaContext context) {
            _context = context;
        }


        async Task<bool> IinventariosRepository.deleteInventario(Inventarios inventario)
        {
            // Verificamos si el usuario existe en el contexto antes de eliminarlo
            var inventarioExistente = await _context.Inventarios.FindAsync(inventario.IdInventrio);

            if (inventarioExistente == null)
            {
                // Si no existe, retornamos false
                return false;
            }

            // Eliminamos el producto del contexto
            _context.Inventarios.Remove(inventarioExistente);

            // Guardamos los cambios en la base de datos
            await _context.SaveChangesAsync();

            // Si se elimina correctamente, retornamos true
            return true;
        }

       async Task<IEnumerable<Inventarios>> IinventariosRepository.GetAllInventarioPorTienda(int idTienda)
        {
            return await _context.Inventarios
                                  .Where(a => a.tiendaId==idTienda)
                        .ToListAsync();
        }

      async  Task<Inventarios> IinventariosRepository.GetDetails(int id)
        {
            var inventario = await _context.Inventarios
                .FirstOrDefaultAsync(i => i.IdInventrio == id);

            // Retorna el producto si lo encuentra, o null si no existe
            return inventario;
        }

     async   Task<bool> IinventariosRepository.insertInventario(Inventarios inventario)
        {
            var tiendaExiste = await _context.Tiendas.FindAsync(inventario.tiendaId);
            var productoExiste = await _context.Productos.FindAsync(inventario.productoId);


            if(inventario == null || productoExiste == null || tiendaExiste==null) {
                throw new Exception("Inventario no agregado");
            }

            // Agregar el nuevo stock al contexto
            await _context.Inventarios.AddAsync(inventario);

            // Guardar los cambios en la base de datos
            var resultado = await _context.SaveChangesAsync();

            // Si el resultado es mayor que 0, significa que la inserción fue exitosa
            return resultado > 0;


        }

       async Task<bool> IinventariosRepository.updateInventario(Inventarios inventario)
        {
            // Verificamos si el stock existe en la base de datos
            var inventarioExistente = await _context.Inventarios.FindAsync(inventario.IdInventrio);

            if (inventarioExistente == null)
            {
                // Si el producto no existe, retornamos false
                return false;
            }

            // Actualizamos las propiedades del producto existente con los nuevos valores
            _context.Entry(inventarioExistente).CurrentValues.SetValues(inventario);

            // Guardamos los cambios en la base de datos
            var resultado = await _context.SaveChangesAsync();

            // Retornamos true si se actualizó correctamente
            return resultado > 0;

        }
    }
    }

