import React from 'react';
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
const USER_URL = "/users"
const PLAYLIST_URL = "/playlist";

const Playlist = () => {
    const { auth } = useAuth();

    const [playlistName, setPlaylistName] = useState("");
    const [playlists, setPlaylists] = useState([""]);
    const axiosPrivate = useAxiosPrivate();
    const [tracker, setTracker] = useState(0);
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
    useEffect(() => {
        if (!(Object.keys(auth).length === 0)) {
            getUser();
        }

    }, [tracker])

    const handleAddPlaylist = async (e) => {
        e.preventDefault();
        try {
            const username = auth.user;
            const response = await axiosPrivate.post(
                PLAYLIST_URL,
                JSON.stringify({ username, playlistname: playlistName }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            setTracker(tracker + 1);
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        const id = e.target.id;
        try {
            const username = auth.user;
            const playlistname = e.target.id;
            const response = await axiosPrivate.delete(PLAYLIST_URL, {
                data: { playlistname: playlistname, username: username },
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            setTracker(tracker + 1);
        } catch (e) {
            console.log(e);
        }
    };

    return (Object.keys(auth).length === 0 ? (
        <h1>Login to create playlist!</h1>
    ) : (
        <>
            <header>
                <form id="new-task-form">
                    <input
                        type="text"
                        name="new-task-input"
                        id="new-task-input"
                        placeholder="Create New Playlist!"
                        onChange={(e) => {
                            setPlaylistName(e.target.value);
                        }} />
                    <input type="submit"
                        id="new-task-submit"
                        className="taskbtn"
                        value="Add"
                        onClick={handleAddPlaylist} />
                    <div className='addtag'>
                        <FontAwesomeIcon icon={faFileCirclePlus} />
                    </div>
                </form>
            </header>
            <main>
                <section class="task-list">
                    {playlists.map((playname) => (

                        <div id="tasks"
                            key={playname}
                        >
                            <div class="task">
                                <div class="content">
                                    <input
                                        type="text"
                                        class="text"
                                        value={playname}
                                        // onClick={handleOpen}
                                        readonly />
                                </div>
                                <div class="actions">
                                    <button
                                        class="edit taskbtn delete"
                                        id={playname}
                                        onClick={handleDelete}
                                    >
                                        Delete
                                        &nbsp;
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </>
    )
    );
}

export default Playlist;