import React, { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Favorites from "./pages/Favorites";
import FilteredPokemon from "./pokemon/FilteredPokemon";
import Pokedex from "./pokemon/Pokedex";

export const PokedexContext = React.createContext();

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);
  const [AllPokemon, setAllPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([])

  const fetchPokeData = useCallback(async () => {
    let url = "";
    if (page === 1) {
      url = "https://pokeapi.co/api/v2/pokemon";
    } else {
      url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${
        20 * (page - 1)
      }`;
    }

    try {
      let response = await fetch(url);

      if (!response.ok) {
        throw new Error("something went wrong when fetching pokeData");
      }

      let data = await response.json();
      let parsedData = [];

      data.results.forEach((element) => {
        parsedData.push(element);
      });

      // let FetchedPokemon = data.results.map((item) => item.name);

      setPokemon(parsedData);
      // console.log(parsedData)
    } catch (e) {
      console.log(e);
    }
  }, [page]);

  useEffect(() => {
    fetchPokeData();
  }, [fetchPokeData]);

  const fetchAllPokemon = useCallback(async () => {
    try {
      let response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100000"
      );

      if (!response.ok) {
        throw new Error("something went wrong when fetching ALL pokemon");
      }

        let data = await response.json();
        

      let allPokemonList = data.results;
      // let nameList = allPokemonList.map(item => item.name)
      setAllPokemon(allPokemonList);

        
        // let filteredList = nameList.filter(item => item.includes(searchTerm))
      

    } catch (e) {
      console.log(e);
    }
  }, []);  


  useEffect(() => {
    fetchAllPokemon();
  }, [fetchAllPokemon]);

  

  const searchHandler = (searchTerm) => {
    setIsFiltering(true)
    let filteredList = AllPokemon.filter(item => item.name.includes(searchTerm))
    setFilteredPokemon(filteredList)
  };

  const toggleStateHandler = () => {
   setIsFiltering(false)
 }

  let homePageElement = !isFiltering ? (
    <Pokedex setPage={setPage} page={page} />
  ) : (
    <FilteredPokemon searchTerm={searchTerm} filteredPokemon={filteredPokemon} />
  );


  return (
    <div>
      <PokedexContext.Provider value={pokemon}>
        <Header search={searchHandler} toggle={toggleStateHandler}/>
        <div className="App">
          <Routes>
            App
            <Route path="/" element={homePageElement} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
        <Footer />
      </PokedexContext.Provider>
    </div>
  );
}

export default App;
