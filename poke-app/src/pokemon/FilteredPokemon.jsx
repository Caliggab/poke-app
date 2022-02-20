import Pokemon from "./Pokemon";
import styles from "./FilteredPokemon.module.css";
import NotFound from "./NotFound";

const FilteredPokemon = (props) => {
  let list = props.filteredPokemon;

  let pokemons = list.map((item) => (
    <Pokemon
      name={item.name}
      url={item.url}
      key={item.name}
      addFav={props.addFav}
      favorites={props.favorites}
      onToggleModal={props.onToggleModal}
      setModalURL={props.setModalURL}
    />
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

  let component =
    list.length === 0 ? (
      <NotFound />
    ) : (
      <div className={styles.pokedexGrid}>{pokemons}</div>
    );

  return (
    <div>
      <div>{props.searchTerm}</div>
      {component}
    </div>
  );
};

export default FilteredPokemon;
