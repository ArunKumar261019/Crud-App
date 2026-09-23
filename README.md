# Docker Compose Practice Project

This practice environment sets up a complete 3-tier web application using Docker Compose:
- **Frontend**: Nginx serving a static web application
- **Backend**: Node.js / Express REST API
- **Database**: PostgreSQL with initial seed data

---

## 🚀 How to Run

1. **Extract the ZIP file** to your preferred folder.
2. Open your terminal/command prompt in the extracted folder (`docker_practice_project`).
3. Run the following command:
   ```bash
   docker-compose up --build
   ```
4. Access the applications in your web browser:
   - **Frontend UI**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:5000/api/items](http://localhost:5000/api/items)
   - **PostgreSQL**: Accessible at `localhost:5432`

---

## 🛑 Useful Commands

- **Stop containers**:
  ```bash
  docker-compose down
  ```
- **Stop containers and clear database volume**:
  ```bash
  docker-compose down -v
  ```
- **Run in detached (background) mode**:
  ```bash
  docker-compose up -d --build
  ```
- **Check running container logs**:
  ```bash
  docker-compose logs -f
  ```
