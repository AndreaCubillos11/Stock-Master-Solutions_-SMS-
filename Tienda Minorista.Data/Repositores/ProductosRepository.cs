using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TiendaMinorista.Model;

namespace Tienda_Minorista.Data.Repositores
{
    public class ProductosRepository : IProductosRepository
    {
        private readonly AzureConfiguration _connectionString;

        public ProductosRepository(AzureConfiguration connectionString)
        {
            _connectionString = connectionString;
        }

        protected SqlConnection dbconnection()
        {
            return new SqlConnection(_connectionString.conectionString);
        }

          async Task<bool> IProductosRepository.deleteProducto(Productos producto)
        {
            var db = dbconnection();
            var sql = "Delete from productos where codigoBarras=@codigoBarras";
            var result = await db.ExecuteAsync(sql, new { CodigoBarras = producto.codigoBarras});
            return result > 0;
        }

        Task<IEnumerable<Productos>> IProductosRepository.GetAllProductos()
        {
            var db = dbconnection();
            var sql = "Select * from productos";

            return db.QueryAsync<Productos>(sql, new { });
        }

       Task<Productos> IProductosRepository.GetDetails(long codigoBarras)
        {
            var db = dbconnection();
            var sql = "Select * from productos where=@codigoBarras";

            return db.QueryFirstOrDefaultAsync<Productos>(sql, new { CodigoBarras = codigoBarras });
        }

       async Task<bool> IProductosRepository.insertProducto(Productos producto)
        {
            var db = dbconnection();



            var sql = "Insert into Productos( Id,codigoBarras,Nombre,descripcion,precio,categoria,fechaIngreso)" +
                      " Values ( @Id,@codigoBarras,@Nombre,@descripcion,@precio,@categoria,@fechaIngreso)";

            var result = await db.ExecuteAsync(sql, new
            {
                producto.Id,
                producto.codigoBarras,
                producto.nombre,
                producto.descripcion,
                producto.precio,
                producto.categoria,
                producto.fechaIngreso,
                producto.estado

            });

            return result > 0;
        }

      async
            Task<bool> IProductosRepository.updateproducto(Productos producto)
        {
            var db = dbconnection();
            var sql = "update productos set Id=@Id," +
                "CodigoBarras= @CodigoBarras ," +
                "nombre=@nombre," +
                "descripcion=@descripcion," +
                "precio=@precio," +
                "categoria=@categoria," +
                "fechaIngreso=@fechaIngreso," +
                "estado=@estado  where codigoBarras=@CodigoBarras";



            var result = await db.ExecuteAsync(sql, new
            { producto.Id, producto.codigoBarras, producto.nombre, producto.descripcion, producto.precio, producto.categoria, producto.fechaIngreso,producto.estado });
            return result > 0;
        }
    }
}
