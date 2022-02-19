import styles from './Footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <small>
      © Copyright {new Date().getFullYear()} PokéApp{" "} by Gabriel Arriaza
      <br />
      <b>
        <a href="https://github.com/Caliggab/poke-app">Source Code</a>
      </b>
    </small>
  </footer>
);

export default Footer;
