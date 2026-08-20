import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { Link, scroller } from "react-scroll";
import homeMobileImg from "../../assets/mobileMenu/homeIMG.svg";
import calendarIcon from "../../assets/mobileMenu/mobileCalendar.svg";
import surfMobile from "../../assets/mobileMenu/mobileSurf.svg";
import locationMobile from "../../assets/mobileMenu/locationMobile.svg";

const NAV_ITEMS = [
  { to: "home", label: "Home", icon: homeMobileImg },
  { to: "forecast", label: "Forecast", icon: calendarIcon },
  { to: "rental", label: "Rental", icon: surfMobile },
  { to: "location", label: "Location", icon: locationMobile },
];

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (to: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(to, {
          smooth: true,
          duration: 1000,
          offset: to === "home" ? 0 : -70,
        });
      }, 100);
    }
  };

  // const isRentalPage = location.pathname === "/rental";
  const isBookingPage = ["/rental", "/payment", "/confirmed"].includes(
    location.pathname,
  );

  return (
    <header
      className={`${styles.header} ${isBookingPage ? styles.bookingHeader : ""}`}
    >
      <nav className={styles.navigation}>
        <ul className={styles.ul}>
          {NAV_ITEMS.map((item) => (
            <li key={item.to} className={styles.li}>
              <Link
                to={item.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={1000}
                activeClass={styles.activeLink}
                className={styles.link}
                onClick={() => handleNavClick(item.to)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className={styles.menuTrigger}
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </button>
      </nav>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <button
            className={styles.closeButton}
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>

          <ul className={styles.mobileMenuList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.to} className={styles.mobileMenuItem}>
                <Link
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={1000}
                  activeClass={styles.mobileActiveLink}
                  className={styles.mobileMenuLink}
                  onClick={() => handleNavClick(item.to)}
                >
                  <img
                    src={item.icon}
                    alt=""
                    className={styles.mobileMenuIcon}
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
