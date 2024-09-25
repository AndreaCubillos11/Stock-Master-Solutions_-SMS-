using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tienda_Minorista.Data
{
    public class AzureConfiguration
    {
        public AzureConfiguration(string conexion) { 
        conectionString = conexion;
        }
        public string conectionString {  get; set; }
    }
}
