import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

const API_URL = "/api/employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", department: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadEmployees() {
    try {
      setLoading(true); setError("");
      const r = await fetch(API_URL);
      if (!r.ok) throw new Error(`API returned ${r.status}`);
      setEmployees(await r.json());
    } catch (e) { setError(`Cannot load employees: ${e.message}`); }
    finally { setLoading(false); }
  }

  useEffect(() => { loadEmployees(); }, []);

  function change(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  function clear() { setForm({ name: "", email: "", department: "" }); setEditId(null); }

  async function save() {
    if (!form.name.trim() || !form.email.trim() || !form.department.trim()) return alert("Please fill all fields");
    const r = await fetch(editId === null ? API_URL : `${API_URL}/${editId}`, {
      method: editId === null ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" }, body: JSON.stringify(form)
    });
    if (!r.ok) return alert("Save failed");
    clear(); await loadEmployees();
  }

  async function remove(id) {
    if (!confirm("Delete this employee?")) return;
    const r = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!r.ok) return alert("Delete failed");
    await loadEmployees();
  }

  return <main className="container">
    <h1>Employee Management</h1>
    <section className="form">
      <input name="name" placeholder="Name" value={form.name} onChange={change}/>
      <input name="email" placeholder="Email" value={form.email} onChange={change}/>
      <input name="department" placeholder="Department" value={form.department} onChange={change}/>
      <button onClick={save}>{editId === null ? "Add Employee" : "Update Employee"}</button>
      {editId !== null && <button className="secondary" onClick={clear}>Cancel</button>}
    </section>
    {loading && <p>Loading employees...</p>}
    {error && <p className="error">{error}</p>}
    {!loading && !error && <table><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Department</th><th>Actions</th></tr></thead>
      <tbody>{employees.map(e => <tr key={e.id}><td>{e.id}</td><td>{e.name}</td><td>{e.email}</td><td>{e.department}</td><td><button onClick={() => {setEditId(e.id);setForm({name:e.name,email:e.email,department:e.department})}}>Edit</button> <button className="danger" onClick={() => remove(e.id)}>Delete</button></td></tr>)}</tbody>
    </table>}
  </main>;
}

const css = `body{margin:0;font-family:Arial,sans-serif;background:#f4f6f8}.container{max-width:1000px;margin:40px auto;padding:24px;background:white;border-radius:10px;box-shadow:0 2px 10px #0001}h1{margin-top:0}.form{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:25px}input{padding:10px;border:1px solid #ccc;border-radius:5px}button{padding:10px 14px;border:0;border-radius:5px;cursor:pointer;background:#1976d2;color:white}.secondary{background:#777}.danger{background:#c62828}.error{color:#c62828}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:10px;text-align:left}th{background:#eee}`;
const style = document.createElement("style"); style.textContent = css; document.head.appendChild(style);
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
