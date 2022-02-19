import { useCallback, useEffect, useState } from "react";
import styles from "./Pokemon.module.css";

const Pokemon = (props) => {
  const [sprite, setSprite] = useState([]);
  const [Id, setId] = useState([]);
  const [Types, setTypes] = useState([]);

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

      //types

      setTypes(data.types);
    } catch (e) {
      console.log(e);
    }
  },[props.url]);

  useEffect(() => {
    fetchIndividualPokemonData();
  }, [fetchIndividualPokemonData]);

  let parsedTypes = [];
  Types.map((item) => parsedTypes.push(item.type.name));
  let finalTypes = parsedTypes.map((item) => (
    <div className={styles.typeBox}>{item} </div>
  ));

  return (
    <div className={styles.pokecard}>
      <div className={styles.image}>
        <img src={sprite} alt="pokesprite"></img>
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.nameContainer}>
          {props.name}
          <div>#{Id}</div>
        </div>
        <div className={styles.heartContainer}>♡</div>
      </div>
      <div className={styles.typeContainer}>{finalTypes}</div>
    </div>
  );
};

export default Pokemon;
