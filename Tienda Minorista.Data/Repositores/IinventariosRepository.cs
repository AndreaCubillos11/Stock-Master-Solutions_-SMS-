using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TiendaMinorista.Model;

namespace Tienda_Minorista.Data.Repositores
{
    public  interface IinventariosRepository
    {
        Task<IEnumerable<Inventarios>> GetAllInventarioPorTienda(int idTienda);
        Task<Inventarios> GetDetails(int id);
        Task<bool> insertInventario(Inventarios inventario);
        Task<bool> updateInventario(Inventarios inventario);
        Task<bool> deleteInventario(Inventarios inventario);
        
    }
}
