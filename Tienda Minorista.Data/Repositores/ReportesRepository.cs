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
    public class ReportesRepository : IReportesRepository
    {
        private readonly TiendaMinoristaContext _context;

        public ReportesRepository(TiendaMinoristaContext context)
        {
            _context = context;
        }

        async Task<bool> IReportesRepository.deleteReporte(Reportes reporte)
        {
            // Verificamos si la reporte existe en el contexto antes de eliminarla
            var reporteExistente = await _context.Reportes.FindAsync(reporte.ReporteID);

            if (reporteExistente == null)
            {
                // Si no existe, retornamos false
                return false;
            }

            // Eliminamos la reporte del contexto
            _context.Reportes.Remove(reporteExistente);

            // Guardamos los cambios en la base de datos
            await _context.SaveChangesAsync();

            // Retornamos true si el reporte fue eliminado correctamente
            return true;
        }

        public async Task<IEnumerable<Reportes>> GetAllReportes()
        {
            return await _context.Reportes.ToListAsync();
        }

        async Task<Reportes> IReportesRepository.GetDetails(int id)
        {
            // Busca el reporte en la base de datos utilizando el id del reporte
            var reporte = await _context.Reportes
                .FirstOrDefaultAsync(p => p.ReporteID == id);
                
            // Retorna el reporte si lo encuentra, o null si no existe
            return reporte;
        }

        async Task<bool> IReportesRepository.insertReporte(Reportes reporte)
        {
            var usuarioExistente = await _context.Usuarios.FindAsync(reporte.UsuarioID);
            if (usuarioExistente == null)
            {
                throw new Exception("Usuario no encontrado");
            }

            // Agregar el nuevo reporte al contexto
            await _context.Reportes.AddAsync(reporte);

            // Guardar los cambios en la base de datos
            var resultado = await _context.SaveChangesAsync();

            // Si el resultado es mayor que 0, significa que la inserción fue exitosa
            return resultado > 0;
        }

        public async Task<bool> updateReporte(Reportes reporte)
        {
            var reporteExistente = await _context.Reportes.FindAsync(reporte.ReporteID);

            if (reporteExistente == null)
            {
                return false;
            }

            _context.Entry(reporteExistente).CurrentValues.SetValues(reporte);

            var resultado = await _context.SaveChangesAsync();

            return resultado > 0;
        }
    }
}
