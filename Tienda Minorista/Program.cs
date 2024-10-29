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

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()  // Permitir cualquier origen
                   .AllowAnyMethod()  // Permitir cualquier método (GET, POST, etc.)
                   .AllowAnyHeader(); // Permitir cualquier encabezado
        });
});
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//var azureCofiguration = new AzureConfiguration(builder.Configuration.GetConnectionString("DefaultConnection"));
//builder.Services.AddSingleton(azureCofiguration);


builder.Services.AddDbContext<TiendaMinoristaContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


// Agregar autenticación JWT
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




builder.Services.AddScoped<IProductosRepository,ProductosRepository>();
builder.Services.AddScoped<IUsuariosRepository,UsuariosRepository>();
builder.Services.AddScoped<IinventariosRepository,InventarioRepository>();
builder.Services.AddScoped<ITiendasRepository, TiendasRepository>();
builder.Services.AddScoped<IAlertasInventario, AlertasInventarioRepository>();
builder.Services.AddScoped<IMovimientosInventarios, MovimientosInventario>();
builder.Services.AddScoped<IReportesRepository, ReportesRepository>();
builder.Services.AddScoped<IDevolucionesRepository, DevolucionesRepository>();


var app = builder.Build();


app.UseCors("AllowSpecificOrigin");


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

