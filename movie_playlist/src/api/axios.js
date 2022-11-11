import axios from 'axios';

const OMDB_API = 'https://www.omdbapi.com'
const OMDB_API_KEY = "a6c35cd0"

const BASE_URL = "https://e704-103-69-39-55.in.ngrok.io/";



export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const omdbApi = axios.create({
    baseURL: OMDB_API,
    headers: { 'Content-Type': 'application/json' },
})

export const getMovies = async (title) => {
    const response = await omdbApi.get(
        '/',
        {
            params: {
                apiKey: OMDB_API_KEY,
                s: title,
            }
        }
    )
    console.log("aajaaa       ", response.data)
    return response.data
}

export const getOneMovie = async (title) => {
    const response = await omdbApi.get(
        '/',
        {
            params: {
                apiKey: OMDB_API_KEY,
                i: title,
            }
        }
    )
    console.log("aajaaa       ", response.data)
    return response.data
}
