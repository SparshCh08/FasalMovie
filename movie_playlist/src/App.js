import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddPlaylists from './components/AddPlaylists';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Test from './components/Test';
import Home from './pages/home';
import Login from './components/Login';
import PersistLogin from './components/PersistLogin';
import Playlist from './components/playlist';
import Playlistdetails from './pages/playlistdetails';


const App = () => {
  const [searchMovie, setSearchMovie] = useState('');
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (searchMovie) => {
    const url = `https://www.omdbapi.com/?s=${searchMovie}&apikey=b4cd6380`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchMovie);
  }, [searchMovie]);

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((favourites) => favourites.imdbID !== movie.imdbID);
    setFavourites(newFavouriteList);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route element={<PersistLogin />}>
            <Route path="/" element={<Home searchMovie={searchMovie} setSearchMovie={setSearchMovie} movies={movies} addFavouriteMovie={addFavouriteMovie} AddPlaylists={AddPlaylists} favourites={favourites} removeFavouriteMovie={removeFavouriteMovie} />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="playlists/:playlistname" element={<Playlistdetails />}></Route>
            <Route path="test" element={<Test />}></Route>
          </Route>
          {/* <Route path="/*" element={<h1>Error Page</h1>}></Route> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;