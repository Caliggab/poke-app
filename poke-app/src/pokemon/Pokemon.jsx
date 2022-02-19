import { useCallback, useEffect, useState } from "react";
import styles from "./Pokemon.module.css";

const Pokemon = (props) => {
  const [sprite, setSprite] = useState([]);
  const [Id, setId] = useState([]);
  const [Types, setTypes] = useState([]);
  const [isFavorite, setIsFavorite] = useState([]);

  let id = ''

  props.favorites.forEach(item => {
    if (item.name === props.name) {
      id = item.id
    }
  })
  

  const fetchIndividualPokemonData = useCallback(async () => {
    try {
      let response = await fetch(props.url);

      if (!response.ok) {
        throw new Error(
          "something went wrong when getting individual pokemon data"
        );
      }

      let data = await response.json();

      setSprite(data.sprites.front_default);
      setId(data.id);

      setTypes(data.types);
    } catch (e) {
      console.log(e);
    }
  }, [props.url]);

  useEffect(() => {
    fetchIndividualPokemonData();
  }, [fetchIndividualPokemonData]);

  let isInFavorites = false;
  if (props.favorites.filter((item) => item.url === props.url).length > 0) {
    // setIsFavorite(true)
    isInFavorites = true;
  }

  let parsedTypes = [];
  Types.map((item) => parsedTypes.push(item.type.name));
  let finalTypes = parsedTypes.map((item) => (
    <div className={styles.typeBox}>{item} </div>
  ));

  const onToggleFavoriteHandler = () => {
    console.log(id)
    props.addFav(props.name, props.url, id);
  };



  return (
    <div className={styles.pokecard} onClick={onToggleFavoriteHandler}>
      <div className={styles.image}>
        <img src={sprite} alt="pokesprite"></img>
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.nameContainer}>
          {props.name}
          <div>#{Id}</div>
        </div>
        <div className={styles.heartContainer}>{isInFavorites ? '♥️' : '♡'}</div>
      </div>
      <div className={styles.typeContainer}>{finalTypes}</div>
    </div>
  );
};

export default Pokemon;
