import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Home
            </NavLink>
          </li>
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
            {/* <NavLink
              to="/location"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Location
            </NavLink> */}
            <Link
              to="location" // id секции, куда нужно скроллить
              spy={true} // Включает отслеживание скролла (для подсветки)
              smooth={true} // Плавная прокрутка
              offset={-70} // Отступ сверху (если есть фиксированная шапка, чтобы не перекрывать контент)
              duration={1000} // Длительность скролла в миллисекундах
              activeClass={styles.activeLink} // Класс, который добавится при активной секции
              className={styles.link} // Обычный класс ссылки
            >
              Location
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
