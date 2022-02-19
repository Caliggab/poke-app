import styles from './Footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <small>
      © Copyright {new Date().getFullYear()} PokéApp{" "}
      <b>
        <a href="www.github.com">PONER LINK GITHUB</a>
      </b>
    </small>
  </footer>
);

export default Footer;
