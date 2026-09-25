# Simple 3-Tier Docker Application

This project is designed for practicing Docker and Docker Compose on an AWS EC2 Ubuntu instance.

## Architecture

Browser
  |
  v
Frontend (React + Nginx) :80
  |
  v
Backend (Node.js + Express) :5000
  |
  v
Database (PostgreSQL) :5432

Docker Compose creates a private Docker network so containers can communicate using service names.

## 1. Copy the project to EC2

Put this folder on your EC2 instance.

## 2. Start the application

```bash
cd simple-3-tier-docker-app
docker compose up -d --build
```

## 3. Check containers

```bash
docker compose ps
```

You should see:
- simple-frontend
- simple-backend
- simple-db

## 4. Open the application

In your browser:

http://YOUR_EC2_PUBLIC_IP

Make sure the EC2 Security Group allows inbound TCP port 80.

## 5. Test the backend directly

```bash
curl http://YOUR_EC2_PUBLIC_IP:5000/api/items
```

If you use this test, allow TCP port 5000 in the Security Group.

## 6. View logs

```bash
docker compose logs frontend
docker compose logs backend
docker compose logs database
```

Or:

```bash
docker compose logs -f
```

## 7. Stop the application

```bash
docker compose down
```

## 8. Stop and remove database data too

Normally `docker compose down` keeps the named volume.

To remove the database volume:

```bash
docker compose down -v
```

WARNING: `-v` deletes the PostgreSQL data stored in the Docker volume.

## Useful Docker commands

```bash
docker ps
docker ps -a
docker images
docker volume ls
docker network ls

docker compose up -d
docker compose down
docker compose restart
docker compose logs -f
```

## What to practice

1. Build all images.
2. Run all three containers.
3. Inspect the Docker network.
4. Inspect the named volume.
5. Stop only the backend container.
6. Restart the backend.
7. Change frontend code and rebuild.
8. Change database data and verify that it survives `docker compose down`.
9. Run `docker compose down -v` and observe what happens to the data.
10. Push the frontend and backend images to Docker Hub.
