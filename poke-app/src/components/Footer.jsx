import styles from "./Footer.module.css";
import Logo from "../assets/img/github.png";

const Footer = () => (
  <footer className={styles.footer}>
    <small>
      © Copyright {new Date().getFullYear()} PokéApp by Gabriel Arriaza
      <br />
      <b>
        <a href="https://github.com/Caliggab/poke-app" className={styles.link}>
          Source Code{" "}
          <img src={Logo} alt="github-logo" className={styles.logo} />
        </a>
      </b>
    </small>
  </footer>
);

export default Footer;
