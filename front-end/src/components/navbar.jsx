import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

function navbar() {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li>
                <Link to="/name">Name</Link>
            </li>
            <li>
                <Link to="/genre">Genre</Link>
            </li>
            <li>
                <Link to="/platform">Platform</Link>
            </li>
            <li>
                <Link to="/year">Year</Link>
            </li>
            <li>
                <Link to="/country">Country</Link>
                </li>
            <li>
                <Link to="/newgames">Add a new game</Link>
            </li>
            </ul>

        </nav>
    );
}

export default navbar;