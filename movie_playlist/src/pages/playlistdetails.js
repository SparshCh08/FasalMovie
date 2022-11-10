import React, { useEffect, useState } from 'react'
import MovieList from '../components/MovieList';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useParams } from 'react-router-dom';

const Playlistdetails = () => {
    let x;
    const axiosPrivate = useAxiosPrivate();
    const [playlists, setPlaylists] = useState([""]);
    const { playlistname } = useParams();
    console.log('In Playdetails')
    const [t, setT] = useState(0);
    useEffect(() => {
        console.log("andar ghusa")
        const response = axiosPrivate.get("playlist/" + playlistname, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        }).then((response) => {
            console.log('data wata', response.data.movies)
            setPlaylists(response.data.movies);
            console.log('Movies added', playlists)
        })
        // async function getUser() {
        //     try {
        //         const response = await axiosPrivate.get(
        //             USER_URL + "/" + auth.user,
        //             {
        //                 headers: { "Content-Type": "application/json" },
        //                 withCredentials: true,
        //             }
        //         );
        //         setPlaylists(response?.data?.playlists);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

    }, []);
    return (
        <div><MovieList propsOri={playlists} /></div>
    )
}

export default Playlistdetails;