import { useState } from "react";
import EditForm from "../components/EditForm";
import Pokemon from "../pokemon/Pokemon";
import styles from "./Favorites.module.css";

const Favorites = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  // setfavoritePokemon(props.favorites);

  let favorite = props.favorites;

  let onToggleEdit = (event) => {
    setIsEditing(!isEditing);
  };

  let pokemons = favorite.map((item) => (
    <div className={styles.favoriteContainer}>
      <Pokemon
        name={item.name}
        url={item.url}
        key={item.name}
        addFav={props.addFav}
        favorites={props.favorites}
      />

      <div className={styles.infoContainer}>
        <div>Info</div>
        <div className={styles.infoItem}>Add Date: {item.addTime}</div>
        {item.editTime ? <div className={styles.infoItem}>Last Modified:{item.editTime}</div> : ''}
        <div className={styles.buttonGroup}>
          {!isEditing ? (
            <div>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  props.onDelete(item.id);
                }}
              >
                Delete
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  setIsEditing(!isEditing);
                }}
              >
                Give Nicknames
              </button>
            </div>
          ) : (
            <EditForm
              setEdit={onToggleEdit}
              onEdit={props.onEdit}
              id={item.id}
              name={item.name}
              url={item.url}
                nickname={item.nickname}
                addTime={item.addTime}
                editTime={item.editTime}
            />
          )}
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <div className={styles.title}> ♥️ Your Favorite Pokemon! ♥️</div>
      {favorite.length === 0 ? (
        <div> 🙁 You currently don't have any favorites 🙁</div>
      ) : (
        ""
      )}
      <div>
        <div className={styles.pokedexGrid}>{pokemons}</div>
      </div>
    </div>
  );
};

export default Favorites;
