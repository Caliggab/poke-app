import { useCallback, useEffect, useState } from "react";
import styles from "./Pokemon.module.css";
import FullHeart from "../assets/img/full-heart.png";
import EmptyHeart from "../assets/img/empty-heart.png";

const Pokemon = (props) => {
  const [sprite, setSprite] = useState([]);
  const [Id, setId] = useState([]);
  const [Types, setTypes] = useState([]);

  // let id = "";

  // props.favorites.forEach((item) => {
  //   if (item.name === props.name) {
  //     id = item.id;
  //   }
  // });

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

      let arr = [];

      data.types.forEach((item) => {
        arr.push(item.type.name);
      });
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


  // const onToggleFavoriteHandler = () => {
  //   console.log(id);
  //   props.addFav(props.name, props.url, id);
  // };

  const onModalToggleHandler = () => {
    // console.log('modal')
    // console.log(props.url)
    props.setModalURL(props.url)
    props.onToggleModal()
  }

  

  const name = props.name.charAt(0).toUpperCase() + props.name.slice(1);


  let styleColor = parsedTypes[0];

  return (
    <div className={` ${styles.pokecard} ${styles[styleColor]}`} onClick={onModalToggleHandler}>
      <div className={styles.image}>
        <img src={sprite} alt="pokesprite"></img>
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.nameContainer}>
          <div className={styles.name}>{name}</div>
          <div>#{Id}</div>
        </div>
        <div
          className={styles.heartContainer}
        >
          {isInFavorites ? (
            <img src={FullHeart} alt="fullheart"></img>
          ) : (
            <img src={EmptyHeart} alt="emptyheart"></img>
          )}
        </div>
      </div>
      <div className={styles.typeContainer}>{finalTypes}</div>
    </div>
  );
};

export default Pokemon;
