import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/items")
      .then((response) => {
        if (!response.ok) throw new Error("API request failed");
        return response.json();
      })
      .then(setItems)
      .catch(() => setError("Could not connect to backend"));
  }, []);

  return (
    <div className="container">
      <h1>Docker 3-Tier Application</h1>
      <p>Frontend → Backend → PostgreSQL</p>

      {error && <p className="error">{error}</p>}

      <div className="cards">
        {items.map((item) => (
          <div className="card" key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
