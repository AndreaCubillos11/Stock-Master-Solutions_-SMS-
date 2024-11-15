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
            return await _context.Devoluciones.ToListAsync();
        }

       async Task<Devoluciones> IDevolucionesRepository.GetDetails(int id)
        {
            // Busca la tienda en la base de datos utilizando el id 
            var devolucion = await _context.Devoluciones
                .FirstOrDefaultAsync(p => p.DevolucionID == id);

            // Retorna la devolucion si la encuentra, o null si no existe
            return devolucion;
        }
        async Task<bool> IDevolucionesRepository.insertDevolucion(Devoluciones devolucion)
        {
            // Agregar el nuevo producto al contexto
            await _context.Devoluciones.AddAsync(devolucion);

            // Guardar los cambios en la base de datos
            var resultado = await _context.SaveChangesAsync();

            // Si el resultado es mayor que 0, significa que se insertó con éxito
            return resultado > 0;
        }
    }

}   
