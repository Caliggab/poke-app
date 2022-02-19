import { useState } from "react";
import Pokemon from "../pokemon/Pokemon";
import styles from "./Favorites.module.css";

const Favorites = (props) => {

  // setfavoritePokemon(props.favorites);

  let favorite = props.favorites;


  let pokemons = favorite.map((item) => (
    <div className={styles.favoriteContainer}>
      <Pokemon
        name={item.name}
        url={item.url}
        key={item.name}
        addFav={props.addFav}
      />

      <div className={styles.infoContainer}>
        <div className={styles.infoItem}>Add Date: {item.addTime}</div>
        <div className={styles.infoItem}>Last Modified:</div>
        <button onClick={() => {props.onDelete(item.id)}}>Delete</button>
      </div>
    </div>
  ));

  return (
    <div>
      <div className={styles.title}> ♥️ Your Favorite Pokemon! ♥️</div>
      {favorite.length === 0 ? <div> 🙁 You currently don't have any favorites 🙁</div> : ''}
      <div>
        <div className={styles.pokedexGrid}>{pokemons}</div>
      </div>
    </div>
  );
};

export default Favorites;
