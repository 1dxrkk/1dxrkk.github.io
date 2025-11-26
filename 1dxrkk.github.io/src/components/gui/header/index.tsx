import { Link } from "react-router-dom";
import "./Header.css";
import { Button } from "../../ui";

export default function Header() {
  return (
    <div className="header">
      <div className="logo">1dxrk</div>

      <div className="links">
        <Link to="/" className="nav-link">
          home
        </Link>
        <Link to="/about" className="nav-link">
          about me
        </Link>
        <Link to="/products" className="nav-link">
          products
        </Link>
        <Link to="/forums" className="nav-link">
          forums
        </Link>
        <div className="account-actions">
          <Button variant="accent" onClick={() => window.prompt("yo")}>
            Sign Up
          </Button>
          <Button variant="ghost" onClick={() => window.prompt("yo")}>
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}
