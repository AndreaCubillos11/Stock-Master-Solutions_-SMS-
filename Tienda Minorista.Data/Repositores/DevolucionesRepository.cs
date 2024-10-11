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
    public class DevolucionesRepository : IDevolucionesRepository
{
    private readonly TiendaMinoristaContext _context;

    public DevolucionesRepository(TiendaMinoristaContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Devoluciones>> GetAllDevoluciones()
    {
        return await _context.Devoluciones
                             .Include(r => r.Tienda)
                             .Include(r => r.Usuario)
                             .Include(r => r.Producto)// Cargar la entidad Producto relacionada
                             .ToListAsync();
    }
}

}   
