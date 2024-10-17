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
    }
}
