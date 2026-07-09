import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link to="/forecast">Forecast</Link>
          </li>
          <li className={styles.li}>
            <Link to="/rental">Rental</Link>
          </li>
          <li className={styles.li}>
            <Link to="/location">Location</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
