import { useContext } from "react";
import { PokedexContext } from "../App";
import Pokemon from "./Pokemon";

import styles from "./Pokedex.module.css";
import Pagination from "./Pagination";

const Pokedex = (props) => {
  const pokemon = useContext(PokedexContext);

    let pokemons = pokemon.map((item) => (
    <Pokemon name={item.name} url={item.url} key={item.name} addFav={props.addFav} />
  ));
  return (
    <div>
      <div className={styles.bar}>
        <Pagination page={props.page} setPage={props.setPage} />
        <div className={styles.title}>- Gabriel's Pokedex -</div>
        <div>
        <div className={styles.item}>No. of Favorites: </div>
          <div className={styles.counter}>{props.favorites.length}</div>
        </div>
      </div>
      <div className={styles.pokedexGrid}>{pokemons}</div>
    </div>
  );
};

export default Pokedex;
