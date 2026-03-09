import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };
  const location = useLocation();

if (location.pathname === "/login") return null;

  return (

    <nav className="navbar">

      <h2 className="logo">HRMS - Lite</h2>

      <div className="nav-links">

        <Link to="/">Dashboard</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/attendance">Attendance</Link>

        <button onClick={logout} className="logout-btn">
          Logout
        </button>

      </div>

    </nav>

  );
}