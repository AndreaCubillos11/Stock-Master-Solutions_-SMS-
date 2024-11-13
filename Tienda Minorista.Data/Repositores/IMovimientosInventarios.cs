using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TiendaMinorista.Model;

namespace Tienda_Minorista.Data.Repositores
{
    public interface IMovimientosInventarios
    {
        Task<IEnumerable<MovimientosInventarios>> GetAllMoviientosPorIdInvetario(int idInventario);
        Task<IEnumerable<MovimientosInventarios>> GetAllMoviientosPorIdUsuario(int idUsuario);

        Task<IEnumerable<MovimientosInventarios>> GetAllMoviientosPorTipoMovimiento(string tipoMovimiento);

        Task<IEnumerable<ModeloProductosReportes>> GetProductosMasVendidosPorTiendaAsync(int idTienda);
        Task<IEnumerable<ModeloProductosReportes>> GetProductosMenosVendidosPorTiendaAsync(int idTienda);
    }
}
