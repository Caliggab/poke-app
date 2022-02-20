import { useCallback, useEffect, useState } from "react";
import styles from "./PokemonModal.module.css";
import Stats from "./Stats";
import FullHeart from "../assets/img/full-heart.png";
import EmptyHeart from "../assets/img/empty-heart.png";

const PokemonModal = (props) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [types, setTypes] = useState([]);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [hp, setHp] = useState(0);
  const [attack, setAttack] = useState(0);
  const [defense, setDefense] = useState(0);
  const [specialAttack, setSpecialAttack] = useState(0);
  const [specialDefense, setSpecialDefense] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [abilities, setAbilities] = useState([]);
  const [height, setHeight] = useState("");
  const [weight, setweight] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const fetchModalPokemonData = useCallback(async () => {
    setIsLoading(true)
    try {
      let response = await fetch(props.modalURL);

      if (!response.ok) {
        throw new Error(
          "something went wrong when getting individual pokemon data"
        );
      }

      let data = await response.json();

      setName(data.name);
      setTypes(data.types.map((item) => item.type.name));
      setImage(data.sprites.other["official-artwork"].front_default);
      setId(data.id);
      setHp(data.stats[0].base_stat);
      setAttack(data.stats[1].base_stat);
      setDefense(data.stats[2].base_stat);
      setSpecialAttack(data.stats[3].base_stat);
      setSpecialDefense(data.stats[4].base_stat);
      setSpeed(data.stats[5].base_stat);
      setAbilities(data.abilities.map((item) => item.ability.name));
      setweight(data.weight);
      setHeight(data.height);

      setIsLoading(false)
    } catch (e) {
      console.log(e);
    }
  }, [props.modalURL]);

  const fetchDescription = useCallback(async () => {
    try {
      let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );

      if (!response.ok) {
        throw new Error(
          "something went wrong when getting individual pokemon data"
        );
      }

      let data = await response.json();

      let rawDesc = data.flavor_text_entries;

      setDescription(rawDesc);
      // setDescription(data.flavor_text_entries[0].flavor_text.language);
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    fetchModalPokemonData();
    fetchDescription();
  }, [fetchModalPokemonData, fetchDescription]);

  const onClose = () => {
    props.toggleModal();
  };

  let databaseId = "";

  props.favorites.forEach((item) => {
    if (item.name === props.name) {
      databaseId = item.id;
    }
  });


  const onToggleFavoriteHandler = () => {
    console.log(name);
    console.log(props.modalURL);
    console.log(id);
    props.addFav(name, props.modalURL, databaseId);
  };

  let finalDesc = "";

  for (let item in description) {
    if (description[item].language.name === "en") {
      finalDesc = description[item].flavor_text;
    }
  }

  const upperCaseName = name.charAt(0).toUpperCase() + name.slice(1);

  let finalTypes = types.map((item) => (
    <div className={`${styles.typeBox} ${styles[item]}`}>{item} </div>
  ));

  let finalAbilities = abilities.map((item) => (
    <div className={`${styles.abilitiesBox}`}>{item} </div>
  ));

  let isInFavorites = false;
  if (
    props.favorites.filter((item) => item.url === props.modalURL).length > 0
  ) {
    // setIsFavorite(true)
    isInFavorites = true;
  }

  // console.log(props.favorites)

  return (
    <div className={styles.pokemodalcontainer}>
      <div className={styles.closeButton} onClick={onClose}>
        X
      </div>
      {isLoading ? <div>Loading...</div> : ''}
      <div className={styles.box}>
        <div className={styles.name}>{upperCaseName} </div>
        <div className={styles.id}>ID No. {id} </div>
        <div
          className={styles.heartContainer}
          onClick={onToggleFavoriteHandler}
        >
          {isInFavorites ? (
              <img src={FullHeart} alt="fullheart"></img>
          ) : (
            <div>
            <img src={EmptyHeart} alt="emptyheart"></img>
            <div>Add to Favorites!</div>
          </div>
          )}
        </div>

        <div className={styles.types}>{finalTypes}</div>
      </div>

      <div className={styles.box}>
        <img className={styles.image} src={image} alt="pokeimage" />
        <div className={styles.description}> {finalDesc} </div>
      </div>
      <div className={styles.box}>
        <hr />
        <div className={styles.height}>Height: {height} feet </div>
        <div className={styles.weight}>Weight: {weight} pounds</div>
        <div className={styles.stats}>
          <Stats
            hp={hp}
            attack={attack}
            defense={defense}
            specialAttack={specialAttack}
            specialDefense={specialDefense}
            speed={speed}
          />
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.abilities}>Abilities: {finalAbilities}</div>
      </div>
    </div>
  );
};

export default PokemonModal;
