import { useEffect, useState } from "react";
const API_URL = "http://localhost:5000/api/employees";
export default function App() {
  const [employees,setEmployees]=useState([]),[name,setName]=useState(""),[email,setEmail]=useState(""),[department,setDepartment]=useState(""),[editId,setEditId]=useState(null);
  const load=async()=>{const r=await fetch(API_URL);setEmployees(await r.json())};
  useEffect(()=>{load()},[]);
  const clear=()=>{setName("");setEmail("");setDepartment("");setEditId(null)};
  const save=async()=>{if(!name||!email||!department)return alert("Please fill all fields");const employee={name,email,department};await fetch(editId===null?API_URL:`${API_URL}/${editId}`,{method:editId===null?"POST":"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(employee)});clear();load()};
  const edit=e=>{setEditId(e.id);setName(e.name);setEmail(e.email);setDepartment(e.department)};
  const del=async id=>{if(!confirm("Delete this employee?"))return;await fetch(`${API_URL}/${id}`,{method:"DELETE"});load()};
  return <div style={{maxWidth:900,margin:"40px auto",fontFamily:"Arial",padding:20}}><h1>Employee Management</h1><div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:20}}><input placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><input placeholder="Department" value={department} onChange={e=>setDepartment(e.target.value)}/><button onClick={save}>{editId===null?"Add":"Update"}</button>{editId!==null&&<button onClick={clear}>Cancel</button>}</div><table border="1" cellPadding="10" style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Department</th><th>Actions</th></tr></thead><tbody>{employees.map(e=><tr key={e.id}><td>{e.id}</td><td>{e.name}</td><td>{e.email}</td><td>{e.department}</td><td><button onClick={()=>edit(e)}>Edit</button> <button onClick={()=>del(e.id)}>Delete</button></td></tr>)}</tbody></table></div>;
}
