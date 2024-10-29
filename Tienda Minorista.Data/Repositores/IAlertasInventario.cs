using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TiendaMinorista.Model;

namespace Tienda_Minorista.Data.Repositores
{
   public interface IAlertasInventario
    {
        Task<IEnumerable<AlertasInventario>> GetAllAlertas();
        Task<AlertasInventario> GetDetailsAlerta(int idAlerta);

        Task<IEnumerable<AlertasInventario>> GetAllAlertasActivasPorInventario(int idTienda);
    }
}
