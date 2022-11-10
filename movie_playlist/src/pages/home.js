import React from 'react';
import MovieList from '../components/MovieList';
import MovieListHeading from '../components/MovieListHeading';
import SearchBox from '../components/SearchBox';
import '../App.css';
import RemoveMovie from '../components/RemoveMovie';
import logo from './logo.png';
import playlist from './playlist.png';
import Playlist from '../components/playlist';
import useAuth from '../hooks/useAuth'

const Home = ({ searchMovie, setSearchMovie, movies, addFavouriteMovie, AddPlaylists, favourites, removeFavouriteMovie }) => {
    const { auth } = useAuth();
    return (
        <div className='container-fluid movie-app'>
            <div className='row d-flex align-items-center mt-4'>
                <img className='logo' src={logo}></img>
                <MovieListHeading heading="MovieHUB" />
                <SearchBox searchMovie={searchMovie} setSearchMovie={setSearchMovie} />
            </div>
            <div className='row spacedo'>
                <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} favouritemovie={AddPlaylists} />
            </div>
            {/* Only if authorized */}
            <div className='row d-flex align-items-center mt-4'>
                <img className='playlist' src={playlist}></img>
                <MovieListHeading heading="Playlists" />
            </div>
            <Playlist />
            <div className='row'>
                <MovieList movies={favourites} handleFavouritesClick={removeFavouriteMovie} favouritemovie={RemoveMovie} />
            </div>
        </div>
    )
}

export default Home