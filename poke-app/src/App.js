import React, { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Favorites from "./pages/Favorites";
import FilteredPokemon from "./pokemon/FilteredPokemon";
import NotFound from "./pokemon/NotFound";
import Pokedex from "./pokemon/Pokedex";

export const PokedexContext = React.createContext();

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);
  const [AllPokemon, setAllPokemon] = useState([]);
  const [searchTerm] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [favoritePokemon, setFavoritePokemon] = useState([]);

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

  // useEffect(() => {
  //   fetchAllPokemon();
  // }, [fetchAllPokemon]); c

  const searchHandler = (searchTerm) => {
    setIsFiltering(true);
    let filteredList = AllPokemon.filter((item) =>
      item.name.includes(searchTerm)
    );
    setFilteredPokemon(filteredList);
    // setPokemon(filteredList)
  };

  const toggleStateHandler = (event) => {
    setIsFiltering(!isFiltering);
    if (isFiltering) {
      fetchPokeData();
    }
  };

  const fetchFavoriteData = useCallback(async () => {
    try {
      let response = await fetch(
        "https://pokeapp-706c7-default-rtdb.firebaseio.com/favoritepokemon.json"
      );

      if (!response.ok) {
        throw new Error(
          "something went wrong when fetching data from the database"
        );
      }

      let data = await response.json();

      let favoriteData = [];

      for (let item in data) {
        favoriteData.push({
          name: data[item].name,
          url: data[item].url,
          nickname: data[item].nickname,
          addTime: data[item].addTime,
          id: item,
          editTime: data[item].editTime,
        });
      }

      setFavoritePokemon(favoriteData);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const addFavoriteData = async (name, url, nickname) => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;

    try {
      let response = await fetch(
        "https://pokeapp-706c7-default-rtdb.firebaseio.com/favoritepokemon.json",
        {
          method: "POST",
          header: { "Content-type": "application/json" },
          body: JSON.stringify({
            name: name,
            url: url,
            nickname: (nickname = null),
            addTime: dateTime,
            id: Math.random(),
            editTime: null,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "something went wrong when adding data to the database"
        );
      }


      fetchFavoriteData();
    } catch (e) {
      console.log(e);
    }
  };


  const addFavoriteHandler = (name, url, id) => {
    if (favoritePokemon.filter(item => item.name === name).length > 0) {
      onDeleteFavoriteHandler(id)
      return
    }

    let filterFavorites = favoritePokemon.filter(
      (item, index) => item.url === url
    );
    if (filterFavorites.length > 0) {
      return;
    }
    setFavoritePokemon([
      ...favoritePokemon,
      { name: name, url: url, nickname: null },
    ]);
    //database
    addFavoriteData(name, url);
  };

  const onDeleteFavoriteHandler = async (id) => {
    console.log(id);
    try {
      let response = await fetch(
        `https://pokeapp-706c7-default-rtdb.firebaseio.com/favoritepokemon/${id}/.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "something went wrong when deleting data to the database"
        );
      }
      fetchFavoriteData();
    } catch (e) {
      console.log(e);
    }
  };

  const onEditFavoriteHandler = async (
    newName,
    url,
    nickname,
    addTime,
    id,
    editTime
  ) => {
    try {
      let response = await fetch(
        `https://pokeapp-706c7-default-rtdb.firebaseio.com/favoritepokemon/${id}/.json`,
        {
          method: "PATCH",
          header: { "Content-type": "application/json" },
          body: JSON.stringify({
            name: newName,
            url: url,
            nickname: (nickname = null),
            addTime: addTime,
            id: id,
            editTime: editTime,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "something went wrong when editing data to the database"
        );
      }

      fetchFavoriteData();
    } catch (e) {
      console.log(e);
    }

    console.log(id);
    console.log(newName);
    console.log(editTime);
  };

  useEffect(() => {
    fetchPokeData();
    fetchAllPokemon();
    fetchFavoriteData();
  }, [fetchPokeData, fetchAllPokemon, fetchFavoriteData]);

  let homePageElement = !isFiltering ? (
    <Pokedex setPage={setPage} page={page} addFav={addFavoriteHandler} favorites={favoritePokemon}/>
  ) : (
    <FilteredPokemon
      searchTerm={searchTerm}
      filteredPokemon={filteredPokemon}
        addFav={addFavoriteHandler}
        favorites={favoritePokemon}
    />
  );


  return (
    <div>
      <PokedexContext.Provider value={pokemon}>
        <Header search={searchHandler} toggle={toggleStateHandler} />
        <div className="App">
          <Routes>
          <Route path='*' element={<NotFound />} /> 
            <Route path="/" element={homePageElement} />
            <Route path="/filter" element={homePageElement} />
            <Route
              path="/favorites"
              element={
                <Favorites
                  favorites={favoritePokemon}
                  setFavorites={setFavoritePokemon}
                  onDelete={onDeleteFavoriteHandler}
                  onEdit={onEditFavoriteHandler}
                />
              }
            />
          </Routes>
        </div>
        <Footer />
      </PokedexContext.Provider>
    </div>
  );
}

export default App;
