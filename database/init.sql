CREATE DATABASE IF NOT EXISTS EmployeeDB;
USE EmployeeDB;
CREATE TABLE IF NOT EXISTS Employees (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Department VARCHAR(100) NOT NULL
);
INSERT INTO Employees (Name, Email, Department) VALUES
('Arun', 'arun@gmail.com', 'IT'),
('Rahul', 'rahul@gmail.com', 'HR');
