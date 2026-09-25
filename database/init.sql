CREATE DATABASE IF NOT EXISTS EmployeeDB;
USE EmployeeDB;

CREATE TABLE IF NOT EXISTS Employees (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Department VARCHAR(100) NOT NULL
);

INSERT INTO Employees (Name, Email, Department)
SELECT 'Arun', 'arun@gmail.com', 'IT'
WHERE NOT EXISTS (SELECT 1 FROM Employees WHERE Email = 'arun@gmail.com');

INSERT INTO Employees (Name, Email, Department)
SELECT 'Rahul', 'rahul@gmail.com', 'HR'
WHERE NOT EXISTS (SELECT 1 FROM Employees WHERE Email = 'rahul@gmail.com');
