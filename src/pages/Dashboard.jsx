import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/user")
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error(err);
        window.location.href = "/login"; // redirect if unauthorized
      });
  }, []);


   const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    navigate("/login"); // redirect back
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {user.name} 👋</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;