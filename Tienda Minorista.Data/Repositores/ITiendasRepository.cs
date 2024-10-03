using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TiendaMinorista.Model;

namespace Tienda_Minorista.Data.Repositores
{
    public interface ITiendasRepository
    {

        Task<IEnumerable<Tiendas>> GetAllTiendas();
        Task<Tiendas> GetDetails(int id);
        Task<bool> insertTienda(Tiendas tienda);
        Task<bool> updateTienda(Tiendas tienda);
        Task<bool> deleteTienda(Tiendas tienda);

    }
}
