import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <NavLink
              to="/forecast"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Forecast
            </NavLink>
          </li>
          <li className={styles.li}>
            <NavLink
              to="/rental"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Rental
            </NavLink>
          </li>
          <li className={styles.li}>
            <NavLink
              to="/location"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Location
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
