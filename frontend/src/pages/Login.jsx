import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {

  useEffect(() => {
  const token = localStorage.getItem("access");
  if (token) {
    navigate("/");
  }
}, []);

  const navigate = useNavigate();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [error,setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("login/",{
        username,
        password
      });

      localStorage.setItem("access",res.data.access);
      localStorage.setItem("refresh",res.data.refresh);

      navigate("/");

    } catch(err){

      setError("Invalid username or password");

    }

  }

  return(

    <div className="login-page">

      <div className="login-card">

        <h2>HRMS Lite</h2>
        <p className="subtitle">Employee Management System</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin}>

          <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          required
          />

          <div className="password-box">

            <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            />

            <span
            className="show-btn"
            onClick={()=>setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>

          </div>

          <button className="login-btn">
            Login
          </button>

        </form>

        <div className="login-footer">

          <Link to="/forgot-password">
            Forgot Password?
          </Link>

        </div>

      </div>

    </div>

  )

}