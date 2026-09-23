CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

INSERT INTO items (name, description) VALUES
('Docker Compose', 'Multi-container Docker applications tool'),
('Backend API', 'Node.js/Express service connected to PostgreSQL'),
('Frontend UI', 'Nginx web server serving HTML and JavaScript');
