﻿using Microsoft.EntityFrameworkCore;
using TiendaMinorista.Model; // Asegúrate de usar el namespace donde estén tus modelos

public class TiendaMinoristaContext : DbContext
{
    // Constructor que recibe las opciones del DbContext, comúnmente usado para inyección de dependencias.
    public TiendaMinoristaContext(DbContextOptions<TiendaMinoristaContext> options)
        : base(options)
    {
    }

    // Aquí defines las tablas que representarán tus entidades en la base de datos
    public DbSet<Productos> Productos { get; set; }  // Esto representa la tabla 'Productos'
    public DbSet<Usuarios> Usuarios { get; set; }    // Esto representa la tabla 'Usuarios'

    public DbSet<Inventarios> Inventarios { get; set; } // Esto representa la tabla 'Inventarios'

    public DbSet<Tiendas> Tiendas { get; set; }// Esto representa la tabla 'Tiendas

    public DbSet<AlertasInventario> AlertasInventario { get; set; }// Esto representa la tabla 'Alertas Inventario'
    public DbSet<MovimientosInventarios>MovimientosInventarios { get; set; } // Esto representa la tabla Movimientos Inventarios'
    public DbSet<Reportes> Reportes { get; set; }
    public DbSet<Devoluciones> Devoluciones { get; set; }

    // Puedes configurar más cosas, como reglas especiales, llaves foráneas, etc., en este método.


}

