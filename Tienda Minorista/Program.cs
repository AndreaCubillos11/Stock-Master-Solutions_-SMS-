using Tienda_Minorista.Data;
using Tienda_Minorista.Data.Repositores;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var azureCofiguration = new AzureConfiguration(builder.Configuration.GetConnectionString("DefaultConnection"));
builder.Services.AddSingleton(azureCofiguration);
builder.Services.AddScoped<IUsuariosRepository ,UsuariosRepository>();
builder.Services.AddScoped<IProductosRepository,ProductosRepository>();
var app = builder.Build();

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
