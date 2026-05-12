using back.Business;
using back.DAO;
using back.DAO.IDAO;
using back.DAO.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<DbConnectionFactory>();

builder.Services.AddScoped<IAgencyDao, AgencyDao>();
builder.Services.AddScoped<AgencyService>();

builder.Services.AddScoped<IServiceDao, ServiceDao>();
builder.Services.AddScoped<ServiceService>();

builder.Services.AddScoped<IAgencyServiceDao, AgencyServiceDao>();
builder.Services.AddScoped<AgencyServiceManager>();

builder.Services.AddScoped<IVehicleDao, VehicleDao>();
builder.Services.AddScoped<VehicleService>();

builder.Services.AddScoped<IPhoneNumberDao, PhoneNumberDao>();
builder.Services.AddScoped<PhoneNumberService>();

builder.Services.AddScoped<IOtpDao, OtpDao>();
builder.Services.AddScoped<OtpService>();

builder.Services.AddScoped<IRdvDao, RdvDao>();
builder.Services.AddScoped<RdvService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseCors("AllowAll");

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
    c.RoutePrefix = "swagger";
});

app.UseHttpsRedirection();
app.UseCors("AllowReact");
app.UseAuthorization();

app.MapControllers();

app.Run();