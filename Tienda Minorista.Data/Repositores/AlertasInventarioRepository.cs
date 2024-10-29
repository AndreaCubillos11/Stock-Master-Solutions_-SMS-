using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TiendaMinorista.Model;

namespace Tienda_Minorista.Data.Repositores
{
   public class AlertasInventarioRepository : IAlertasInventario
    {
        private readonly TiendaMinoristaContext _context;

        public AlertasInventarioRepository(TiendaMinoristaContext context)
        {
            _context = context;
        }

      async  Task<IEnumerable<AlertasInventario>> IAlertasInventario.GetAllAlertas()
        {
            return await _context.AlertasInventario.ToListAsync();
        }

      async  Task<IEnumerable<AlertasInventario>> IAlertasInventario.GetAllAlertasActivasPorInventario(int idInventario)
        {
            // Consulta que filtra las alertas cuyo estado es "activo" y la tienda correspndiente
            return await _context.AlertasInventario
                                   .Where(a => (a.estado == "activa" || a.estado == "pendiente")
                                     && a.inventarioId == idInventario)
                         .ToListAsync();
        }

      async  Task<AlertasInventario> IAlertasInventario.GetDetailsAlerta(int idAlerta)
        {
            var Alerta = await _context.AlertasInventario
                .FirstOrDefaultAsync(p => p.idAlerta == idAlerta);

            // Retorna el producto si lo encuentra, o null si no existe
            return Alerta;
        }
    }
}
