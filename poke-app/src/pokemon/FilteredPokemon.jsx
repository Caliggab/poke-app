import { useCallback, useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import styles from "./FilteredPokemon.module.css";

const FilteredPokemon = (props) => {
  const [filteredPokeList, setFilteredPokeList] = useState([]);

  let list = props.filteredPokemon;

  console.log(list);

  let pokemons = list.map((item) => (
    <Pokemon name={item.name} url={item.url} key={item.name} />
  ));

  //   setFilteredPokeList(list);

  //   let pokemons = filteredPokeList.map((item) => (
  //     <Pokemon name={item.name} url={item.url} key={item.name} />
  //   ));

  // console.log(filteredPokeList)

  // for (let item of filteredPokeList) {

  // }

  //   const FetchFilteredPokemon = async (name) => {
  //     let url = `https://pokeapi.co/api/v2/pokemon/${name}`;

  //     try {
  //       let response = await fetch(url);

  //       if (!response.ok) {
  //         throw new Error(
  //           "something went wrong when fetching FilteredPokemon data"
  //         );
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  return (
    <div>
      <div>{props.searchTerm}</div>
      <div className={styles.pokedexGrid}>{pokemons}</div>
    </div>
  );
};

export default FilteredPokemon;
