import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <ul>
          <li>
            <Link to="/contact">Contact us</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <Link to="/terms">Terms of use</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
