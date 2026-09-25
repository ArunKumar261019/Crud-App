using MySql.Data.MySqlClient;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var connectionString = builder.Configuration.GetConnectionString("Default")
    ?? "Server=database;Port=3306;Database=EmployeeDB;User=root;Password=rootpassword;";

app.MapGet("/", () => Results.Ok(new { message = "Employee API is running" }));

app.MapGet("/api/employees", () =>
{
    var employees = new List<EmployeeResponse>();
    using var connection = new MySqlConnection(connectionString);
    connection.Open();
    using var command = new MySqlCommand("SELECT Id, Name, Email, Department FROM Employees ORDER BY Id", connection);
    using var reader = command.ExecuteReader();
    while (reader.Read())
    {
        employees.Add(new EmployeeResponse
        {
            Id = reader.GetInt32("Id"),
            Name = reader.GetString("Name"),
            Email = reader.GetString("Email"),
            Department = reader.GetString("Department")
        });
    }
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
    return Results.Ok(new { message = "Employee created successfully" });
});

app.MapPut("/api/employees/{id:int}", (int id, Employee employee) =>
{
    using var connection = new MySqlConnection(connectionString);
    connection.Open();
    using var command = new MySqlCommand("UPDATE Employees SET Name=@Name, Email=@Email, Department=@Department WHERE Id=@Id", connection);
    command.Parameters.AddWithValue("@Id", id);
    command.Parameters.AddWithValue("@Name", employee.Name);
    command.Parameters.AddWithValue("@Email", employee.Email);
    command.Parameters.AddWithValue("@Department", employee.Department);
    var rows = command.ExecuteNonQuery();
    return rows == 0 ? Results.NotFound(new { message = "Employee not found" }) : Results.Ok(new { message = "Employee updated successfully" });
});

app.MapDelete("/api/employees/{id:int}", (int id) =>
{
    using var connection = new MySqlConnection(connectionString);
    connection.Open();
    using var command = new MySqlCommand("DELETE FROM Employees WHERE Id=@Id", connection);
    command.Parameters.AddWithValue("@Id", id);
    var rows = command.ExecuteNonQuery();
    return rows == 0 ? Results.NotFound(new { message = "Employee not found" }) : Results.Ok(new { message = "Employee deleted successfully" });
});

app.Run();

public class Employee
{
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
    public string Department { get; set; } = "";
}

public class EmployeeResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
    public string Department { get; set; } = "";
}
