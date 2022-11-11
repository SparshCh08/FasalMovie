import React, { useEffect, useMemo, useState } from 'react'
import AddPlaylists from './AddPlaylists';

const MovieList = (props) => {
    const AddPlaylists = props.favouritemovie;

    return (

        <>

            {props.movies.map((movie, index) => (
                <div className='image-container d-flex justify-content-start m-2 poster'>
                    <img src={movie.Poster} alt="movie"></img>
                    <div className='overlay d-flex align-items-center justify-content-center'>
                        <AddPlaylists imdbId={movie.imdbID} />
                    </div>
                </div>
            ))
            }
        </>
    )
}
export default MovieList;