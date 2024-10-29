using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TiendaMinorista.Model;

namespace Tienda_Minorista.Data.Repositores
{
    public interface IReportesRepository
    {

        Task<IEnumerable<Reportes>> GetAllReportes();
        Task<Reportes> GetDetails(int id);
        Task<bool> insertReporte(Reportes reporte);
        Task<bool> updateReporte(Reportes reporte);
        Task<bool> deleteReporte(Reportes reporte);

    }
}
