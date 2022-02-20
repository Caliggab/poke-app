import { useContext } from "react";
import { PokedexContext } from "../App";
import Pokemon from "./Pokemon";

import styles from "./Pokedex.module.css";
import Pagination from "./Pagination";

const Pokedex = (props) => {
  const pokemon = useContext(PokedexContext);

  let pokemons = pokemon.map((item) => (
    <Pokemon
      name={item.name}
      url={item.url}
      key={item.name}
      id={item.id}
      addFav={props.addFav}
      favorites={props.favorites}
      onToggleModal={props.onToggleModal}
      setModalURL={props.setModalURL}
    />
  ));
  return (
    <div>
      <div className={styles.bar}>
        <div className={styles.paginationContainer}>
        <Pagination page={props.page} setPage={props.setPage} />
        </div>
        <div className={styles.title}>Gabriel's Pokédex</div>
        <div className={styles.favoriteContainer}>
          <div className={styles.item}>No. of Favorites: </div>
          <div className={styles.counter}> <span className={styles.heart}> ♥️ </span> {props.favorites.length}</div>
        </div>
      </div>
      <div className={styles.pokedexGrid}>{pokemons}</div>
      <div className={styles.paginationContainer}>
        <Pagination page={props.page} setPage={props.setPage} />
        </div>
    </div>
  );
};

export default Pokedex;
