using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TiendaMinorista.Model;

namespace Tienda_Minorista.Data.Repositores
{
    public interface IProductosRepository
    {

        Task<IEnumerable<Productos>> GetAllProductos();
        Task<Productos> GetDetailsForCogigo(long id);
        Task<bool> insertProducto(Productos producto);
        Task<bool> updateproducto(Productos producto);
        Task<bool> deleteProducto(Productos producto);
        Task<Productos>GetDetailsForName(string name);
        Task<Productos> GetDetailsForId(int id);
        
    }
}
