import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
const USER_URL = "/users"
const AddPlaylists = ({ imdbId }) => {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [playlists, setPlaylists] = useState([""]);
    useEffect(() => {
        async function getUser() {
            try {
                const response = await axiosPrivate.get(
                    USER_URL + "/" + auth.user,
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
                setPlaylists(response?.data?.playlists);
            } catch (error) {
                console.log(error);
            }
        }
        if (!(Object.keys(auth).length === 0)) {
            getUser();
        }
    }, [])

    const handleAddMovie = async (e) => {
        const playlistname = e.target.id;
        const res = axiosPrivate.post(
            "playlist/" + playlistname,
            JSON.stringify({ imdbID: imdbId }),
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        console.log(res);
    };

    return (
        <>
            &nbsp;
            <div class="dropdown">
                <button class="dropbtn">ADD To:</button>
                <div class="dropdown-content">
                    {playlists.map((movie) => (
                        <li onClick={handleAddMovie} id={movie}>{movie}</li>
                    ))}
                </div>
            </div>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className='bi bi-plus-circle' viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg> */}
        </>
    );
};
export default AddPlaylists;