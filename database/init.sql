CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL
);

INSERT INTO items (name, description) VALUES
('Docker Compose', 'Tool for running multiple Docker containers'),
('Backend API', 'Node.js and Express API'),
('Frontend UI', 'Nginx web server serving the frontend')
ON CONFLICT DO NOTHING;
