import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../assets/logo.png";

function Header() {
  return (
    <header className={styles.header}>
      <ul>
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      <img src={logo} alt="logo" className={styles.logo} />
    </header>
  );
}

export default Header;
