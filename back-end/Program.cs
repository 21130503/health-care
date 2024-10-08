using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using MyWebApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), new MySqlServerVersion(new Version(8, 0, 21))));

//  config the signalIR
builder.Services.AddSignalR();
// phục vụ tệp tin tĩnh
// Crors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials();
        });
});
// Tạo thư mục
var imagesPath = Path.Combine(Directory.GetCurrentDirectory(), "images");
if (!Directory.Exists(imagesPath))
{
    Directory.CreateDirectory(imagesPath);
}
builder.Services.AddControllers();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
// Cấu hình phục vụ các tệp tĩnh
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "images")),
    RequestPath = "/images"
});
app.UseCors("AllowSpecificOrigin"); // Sử dụng chính sách CORS
app.UseRouting(); // Bắt buộc phải sử dụng trước khi dùng Endpoints
// Cấu hình các endpoints
// app.UseEndpoints(endpoints =>
// {
//     endpoints.MapControllers(); // Map các controller
//     endpoints.MapHub<NotificationHub>("/notificationHub"); // Map SignalR Hub
// });
app.MapHub<NotificationHub>("/notificationHub");
app.MapControllers();

app.Run();
