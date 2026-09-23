using MySql.Data.MySqlClient;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options => options.AddPolicy("AllowFrontend", policy =>
    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();
app.UseCors("AllowFrontend");

const string connectionString = "Server=database;Port=3306;Database=EmployeeDB;User=root;Password=rootpassword;";

app.MapGet("/", () => "Employee API is running.");

app.MapGet("/api/employees", () =>
{
    var employees = new List<object>();
    using var connection = new MySqlConnection(connectionString);
    connection.Open();
    using var command = new MySqlCommand("SELECT Id, Name, Email, Department FROM Employees", connection);
    using var reader = command.ExecuteReader();
    while (reader.Read())
        employees.Add(new { Id = reader.GetInt32("Id"), Name = reader.GetString("Name"), Email = reader.GetString("Email"), Department = reader.GetString("Department") });
    return Results.Ok(employees);
});

app.MapPost("/api/employees", (Employee employee) =>
{
    using var connection = new MySqlConnection(connectionString);
    connection.Open();
    using var command = new MySqlCommand("INSERT INTO Employees (Name, Email, Department) VALUES (@Name, @Email, @Department)", connection);
    command.Parameters.AddWithValue("@Name", employee.Name);
    command.Parameters.AddWithValue("@Email", employee.Email);
    command.Parameters.AddWithValue("@Department", employee.Department);
    command.ExecuteNonQuery();
    return Results.Ok("Employee created successfully");
});

app.MapPut("/api/employees/{id}", (int id, Employee employee) =>
{
    using var connection = new MySqlConnection(connectionString);
    connection.Open();
    using var command = new MySqlCommand("UPDATE Employees SET Name=@Name, Email=@Email, Department=@Department WHERE Id=@Id", connection);
    command.Parameters.AddWithValue("@Id", id);
    command.Parameters.AddWithValue("@Name", employee.Name);
    command.Parameters.AddWithValue("@Email", employee.Email);
    command.Parameters.AddWithValue("@Department", employee.Department);
    command.ExecuteNonQuery();
    return Results.Ok("Employee updated successfully");
});

app.MapDelete("/api/employees/{id}", (int id) =>
{
    using var connection = new MySqlConnection(connectionString);
    connection.Open();
    using var command = new MySqlCommand("DELETE FROM Employees WHERE Id=@Id", connection);
    command.Parameters.AddWithValue("@Id", id);
    command.ExecuteNonQuery();
    return Results.Ok("Employee deleted successfully");
});

app.Run();
public record Employee(string Name, string Email, string Department);
