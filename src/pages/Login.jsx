import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login({ onLogin  }){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit  = async (e) => {
         e.preventDefault();
         setError("");

         try {
            const response = await api.post("/login", {
                email,
                password,
            });
            // Save token in localStorage
            localStorage.setItem("token", response.data.token);

            // Call parent callback
            onLogin(response.data.user);
            navigate("/dashboard");

         }catch(err){
            setError("Invalid credentials");
         }
    };

    return(
        <div style={{ maxWidth: "400px", margin: "50px auto" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <br /><br />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <br /><br />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default Login;