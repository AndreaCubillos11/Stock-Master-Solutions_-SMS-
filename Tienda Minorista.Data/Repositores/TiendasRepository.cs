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
    public class TiendasRepository : ITiendasRepository
    {
        private readonly TiendaMinoristaContext _context;

        public TiendasRepository(TiendaMinoristaContext context)
        {
            _context = context;
        }

        async Task<bool> ITiendasRepository.deleteTienda(Tiendas tienda)
        {
            // Verificamos si la tienda existe en el contexto antes de eliminarla
            var tiendaExistente = await _context.Tiendas.FindAsync(tienda.Id);

            if (tiendaExistente == null)
            {
                // Si no existe, retornamos false
                return false;
            }

            // Eliminamos la tienda del contexto
            _context.Tiendas.Remove(tiendaExistente);

            // Guardamos los cambios en la base de datos
            await _context.SaveChangesAsync();

            // Retornamos true si la tienda fue eliminada correctamente
            return true;
        }

        public async Task<IEnumerable<Tiendas>> GetAllTiendas()
        {
            return await _context.Tiendas.ToListAsync();
        }

        async Task<Tiendas> ITiendasRepository.GetDetails(int id)
        {
            // Busca la tienda en la base de datos utilizando el id 
            var tienda = await _context.Tiendas
                .FirstOrDefaultAsync(p => p.Id == id);

            // Retorna el producto si lo encuentra, o null si no existe
            return tienda;
        }

        async Task<bool> ITiendasRepository.insertTienda(Tiendas tienda)
        {
            await _context.Tiendas.AddAsync(tienda);


            var resultado = await _context.SaveChangesAsync();

            return resultado > 0;
        }

        public async Task<bool> updateTienda(Tiendas tienda)
        {
            var tiendaExistente = await _context.Tiendas.FindAsync(tienda.Id);

            if (tiendaExistente == null)
            {
                return false;
            }

            _context.Entry(tiendaExistente).CurrentValues.SetValues(tienda);

            var resultado = await _context.SaveChangesAsync();

            return resultado > 0;
        }
    }
}
