# Three-Tier CRUD Application

React + .NET 8 Web API + MySQL, designed for learning Docker Compose.

## Run

docker compose up --build

Open http://localhost:3000

## Useful commands

docker compose ps
docker compose logs backend
docker compose logs database
docker compose down
docker compose down -v

## Architecture
Frontend (3000) -> Backend (5000) -> MySQL (3306)

The backend connects to MySQL using `Server=database` because `database` is the Compose service name.
