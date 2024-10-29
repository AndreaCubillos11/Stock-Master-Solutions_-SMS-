using System.Configuration;
using Tienda_Minorista.Data;
using Tienda_Minorista.Data.Repositores;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Identity;
using TiendaMinorista.Model;

var builder = WebApplication.CreateBuilder(args);

<<<<<<< HEAD
=======
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()  // Permitir cualquier origen
                   .AllowAnyMethod()  // Permitir cualquier m閠odo (GET, POST, etc.)
                   .AllowAnyHeader(); // Permitir cualquier encabezado
        });
});
>>>>>>> 83d9bc0 (Configuraci贸n b谩sica de CORS, ajuste de rutas y validaci贸n de dominio de correo)
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//var azureCofiguration = new AzureConfiguration(builder.Configuration.GetConnectionString("DefaultConnection"));
//builder.Services.AddSingleton(azureCofiguration);


builder.Services.AddDbContext<TiendaMinoristaContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


// Agregar autenticaci髇 JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var signinkey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"));
        var signiCredencial = new SigningCredentials(signinkey, SecurityAlgorithms.HmacSha256Signature);
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateAudience = false,
            ValidateIssuer = false,
            IssuerSigningKey = signinkey,
        };
    });


<<<<<<< HEAD
=======


>>>>>>> 83d9bc0 (Configuraci贸n b谩sica de CORS, ajuste de rutas y validaci贸n de dominio de correo)
builder.Services.AddScoped<IProductosRepository,ProductosRepository>();
builder.Services.AddScoped<IUsuariosRepository,UsuariosRepository>();
builder.Services.AddScoped<IinventariosRepository,InventarioRepository>();
builder.Services.AddScoped<ITiendasRepository, TiendasRepository>();
builder.Services.AddScoped<IAlertasInventario, AlertasInventarioRepository>();
builder.Services.AddScoped<IMovimientosInventarios, MovimientosInventario>();
builder.Services.AddScoped<IReportesRepository, ReportesRepository>();
builder.Services.AddScoped<IDevolucionesRepository, DevolucionesRepository>();


var app = builder.Build();

<<<<<<< HEAD
=======

app.UseCors("AllowSpecificOrigin");


>>>>>>> 83d9bc0 (Configuraci贸n b谩sica de CORS, ajuste de rutas y validaci贸n de dominio de correo)
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
<<<<<<< HEAD

=======
>>>>>>> 83d9bc0 (Configuraci贸n b谩sica de CORS, ajuste de rutas y validaci贸n de dominio de correo)
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
<<<<<<< HEAD
=======

>>>>>>> 83d9bc0 (Configuraci贸n b谩sica de CORS, ajuste de rutas y validaci贸n de dominio de correo)
