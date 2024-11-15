using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TiendaMinorista.Model;

namespace Tienda_Minorista.Data.Repositores
{
    public class MovimientosInventario :IMovimientosInventarios
    {
        private readonly TiendaMinoristaContext _context;

        public MovimientosInventario(TiendaMinoristaContext context) 

        { _context = context; 

        }

       async Task<IEnumerable<MovimientosInventarios>> IMovimientosInventarios.GetAllMoviientosPorIdInvetario(int idInventario)
        {
            // Consulta que filtra las alertas cuyo estado es "activo" y la tienda correspndiente
            return await _context.MovimientosInventarios
                                   .Where(a => a.inventarioId == idInventario)
                         .ToListAsync();
        }
        async Task<IEnumerable<MovimientosInventarios>> IMovimientosInventarios.GetAllMoviientosPorIdTienda(int idTienda)
        {
            
            return await _context.MovimientosInventarios
                                   .Where(a => a.tiendaId == idTienda)
                         .ToListAsync();
        }
        public async Task<IEnumerable<MovimientosInventarios>> GetAllMovimientos()
        {
            return await _context.MovimientosInventarios.ToListAsync();
        }

        async Task<IEnumerable<MovimientosInventarios>> IMovimientosInventarios.GetAllMoviientosPorIdUsuario(int idUsuario)
        {
            return await _context.MovimientosInventarios
                                    .Where(a => a.UsuarioId == idUsuario)
                          .ToListAsync();
        }

      async  Task<IEnumerable<MovimientosInventarios>> IMovimientosInventarios.GetAllMoviientosPorTipoMovimiento(string tipoMovimiento)
        {
            return await _context.MovimientosInventarios
                                   .Where(a => a.TipoMovimiento == tipoMovimiento)
                         .ToListAsync();
        }

        public async Task<IEnumerable<ModeloProductosReportes>> GetProductosMasVendidosPorTiendaAsync(int idTienda)
        {
            var result = await _context.Set<MovimientosInventarios>()
                .Where(m => m.tiendaId == idTienda && m.TipoMovimiento == "Venta")
                .GroupBy(m => m.productoId)
                .Select(g => new ModeloProductosReportes
                {
                    productoId = g.Key,
                    totalCantidadVendida = g.Sum(m => m.cantidad)
                })
                .OrderByDescending(p => p.totalCantidadVendida)
                .ToListAsync();

            return result;
        }

        public async Task<IEnumerable<ModeloProductosReportes>> GetProductosMenosVendidosPorTiendaAsync(int idTienda)
        {
            var result = await _context.Set<MovimientosInventarios>()
                .Where(m => m.tiendaId == idTienda && m.TipoMovimiento == "Venta")
                .GroupBy(m => m.productoId)
                .Select(g => new ModeloProductosReportes
                {
                    productoId = g.Key,
                    totalCantidadVendida = g.Sum(m => m.cantidad)
                })
                .OrderBy(p => p.totalCantidadVendida) // Ordena de menor a mayor
                .ToListAsync();

            return result;
        }


    }
    }

