# Three-Tier Employee CRUD - EC2 Ready

Architecture:
Browser -> Nginx/React :80 -> /api proxy -> .NET 8 backend :5000 -> MySQL :3306

Only port 80 needs to be public in the EC2 Security Group. Backend and MySQL are internal Docker services and are NOT published to the EC2 host.

## EC2 Security Group
Inbound rules recommended:
- SSH TCP 22: My IP (your public IP), not 0.0.0.0/0 if possible
- HTTP TCP 80: 0.0.0.0/0
Do NOT open 3306 or 5000 to the internet for this learning setup.

## Install Docker on Ubuntu EC2
Use Docker's official installation method for your Ubuntu version, then verify:
  docker --version
  docker compose version

If your user gets permission denied:
  sudo usermod -aG docker $USER
  newgrp docker

## Run
Upload/extract this folder on EC2, then:
  cd three-tier-crud-ec2
  docker compose down
  docker compose up -d --build
  docker compose ps

Open in your browser:
  http://YOUR_EC2_PUBLIC_IP/

## Verify
From EC2:
  curl http://localhost/
  curl http://localhost/api/employees

Expected API response is a JSON array of employees.

Check logs:
  docker compose logs frontend
  docker compose logs backend
  docker compose logs database

Check containers:
  docker compose ps

## If you used an older version and want a fresh database
WARNING: this deletes the MySQL Docker volume/data:
  docker compose down -v
  docker compose up -d --build

## Important networking explanation
Do not put localhost in the React API URL. React uses /api/employees.
Nginx receives /api/employees and forwards it to backend:5000.
The backend connects to database:3306.
These Docker service names work because all services are on app-network.

## If port 80 is already used
Check:
  sudo ss -ltnp | grep :80

If another web server uses port 80, stop it or change the frontend mapping in docker-compose.yml from:
  - "80:80"
to:
  - "8080:80"
Then open Security Group TCP 8080 and browse http://YOUR_EC2_PUBLIC_IP:8080/.
For the simplest EC2 setup, use port 80.
