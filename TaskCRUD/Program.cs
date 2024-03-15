using TaskCRUD.Configurations;
using TaskCRUD.Services.Classes;
using TaskCRUD.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddMvc();
builder.Services.AddCors(options => options.AddPolicy("AngularClient", policy =>
{
    policy.WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
}));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("MongoDatabase"));
builder.Services.AddSingleton<ITasksService,TasksService>();
builder.Services.AddSingleton<IStatusService, StatusService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AngularClient");

app.UseAuthorization();

app.MapControllers();

app.Run();
