import React, { useEffect, useMemo, useState } from 'react'
import AddPlaylists from './AddPlaylists';

const MovieList = ({ playlists }) => {
    // const AddPlaylists = props.favouritemovie;
    // const [props, setProps] = useState();
    // useMemo(() => {
    //     console.log('movies update', propsOri.movies)
    //     setProps(propsOri)
    // }, [propsOri])
    // useEffect(() => {
    //     console.log('movies updated')
    //     console.log(propsOri.movies)
    //     setProps(propsOri)
    // }, [propsOri.movies]);
    const [x, sx] = useState(playlists);
    useEffect(() => {

    }, [playlists])
    console.log('in movie', playlists)
    return (<></>)
    // if (!props?.movies) {
    //     return (<>Nahi h bhai kuch bhi sorry please kal aana </>)
    // }
    // return (

    //     <>

    //         {props.movies.map((movie, index) => (
    //             <div className='image-container d-flex justify-content-start m-2 poster'>
    //                 <img src={movie.Poster} alt="movie"></img>
    //                 <div className='overlay d-flex align-items-center justify-content-center'>
    //                     <AddPlaylists imdbId={movie.imdbID} />
    //                 </div>
    //             </div>
    //         ))
    //         }
    //     </>
    // )
}
export default MovieList;