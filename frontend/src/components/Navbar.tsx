import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.body.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (dark) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDark(!dark);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="nav">
      <div>
        <Link to="/sweets">🍬 Sweets</Link>
        {role === "ADMIN" && <Link to="/admin">🛠 Admin</Link>}
      </div>

      <div>
        <button onClick={toggleTheme}>
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
