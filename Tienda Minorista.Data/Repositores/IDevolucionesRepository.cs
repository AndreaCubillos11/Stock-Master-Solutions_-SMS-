using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TiendaMinorista.Model;

namespace Tienda_Minorista.Data.Repositores
{
    public interface IDevolucionesRepository
    {

        Task<IEnumerable<Devoluciones>> GetAllDevoluciones();
        Task<Devoluciones> GetDetails(int id);


    }
}
