import styles from "./Navbar.module.css";
import Logo from "../assets/img/pokeball.svg";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";

const Navbar = (props) => {
  const location = useLocation()
  let currentUrl = location.pathname

  const toggleStateHandler = () => {
    props.toggle();
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Link to="/" className={styles.listItem} onClick={toggleStateHandler}>
          <img
            src={Logo}
            alt="pokeball"
            className="logo"
            width="50px"
            height="50px"
          />
        </Link>
        <ul className={styles.list}>
          <Link to="/" className={styles.listItem} onClick={toggleStateHandler}>
            {" "}
            PokéHome{" "}
          </Link>
          <Link to="/favorites" className={styles.listItem}>
            {" "}
            Favorites{" "}
          </Link>
        </ul>
      </div>
      <div className={styles.item}>
        {currentUrl === '/favorites' ? '' : <SearchBar search={props.search} />}
      </div>
    </div>
  );
};

export default Navbar;
