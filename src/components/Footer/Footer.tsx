import styles from "./Footer.module.scss";
import footerImg from "../../assets/footerImg/footerNewLogo.svg";
import instImg from "../../assets/footerImg/instagramm.svg";
import telegaImg from "../../assets/footerImg/telega.svg";
import emailImg from "../../assets/footerImg/mailIcon.svg";
// import { NavLink } from "react-router-dom";
import { scroller } from "react-scroll";

export const Footer = () => {
  const goTo = (to: string) => {
    scroller.scrollTo(to, { smooth: true, duration: 1000, offset: -70 });
  };
  return (
    <section className={styles.footer}>
      <div className={styles.threeColumns}>
        <div className={styles.content}>
          {/* <h2 className={styles.footerTitle}>Freedom Surf</h2> */}
          <img
            src={footerImg}
            alt="Footer Image"
            className={styles.footerImage}
          />
          <p className={styles.mainText}>Ride the perfect wave.</p>
        </div>

        <div className={styles.navConnectRow}>
          <div className={styles.navigation}>
            <h2 className={styles.navTitle}>Navigation</h2>
            <ul className={styles.navList}>
              <li className={styles.liText}>
                <a
                  href="#forecast"
                  onClick={(e) => {
                    e.preventDefault();
                    goTo("forecast");
                  }}
                >
                  Forecast
                </a>
              </li>
              <li className={styles.liText}>
                <a
                  href="#rental"
                  onClick={(e) => {
                    e.preventDefault();
                    goTo("rental");
                  }}
                >
                  Rental
                </a>
              </li>
              <li className={styles.liText}>
                <a
                  href="#location"
                  onClick={(e) => {
                    e.preventDefault();
                    goTo("location");
                  }}
                >
                  Location
                </a>
              </li>
              <li className={styles.liText}>
                <a
                  href="#reviews"
                  onClick={(e) => {
                    e.preventDefault();
                    goTo("reviews");
                  }}
                >
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.connect}>
            <h2 className={styles.navTitle}>Connect</h2>
            <ul className={styles.navList}>
              <li className={styles.liFlex}>
                <img src={emailImg} alt="" />
                <a href="" type="email" className={styles.liText}>
                  hello@swellstatus.com
                </a>
              </li>
              <li className={styles.liFlex}>
                <img src={instImg} alt="" />
                <a href="" className={styles.liText}>
                  Instagram
                </a>
              </li>
              <li className={styles.liFlex}>
                <img src={telegaImg} alt="" />
                <a href="" className={styles.liText}>
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <footer className={styles.bottomFooter}>
        © 2026 SwellStatus. All rights reserved. Privacy Policy | Terms of
        Service
      </footer>
    </section>
  );
};
