import axios from 'axios';

const API_KEY = '382dc8f8843aafc7075014fcf5e80043';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODJkYzhmODg0M2FhZmM3MDc1MDE0ZmNmNWU4MDA0MyIsIm5iZiI6MTc0MzAxMjIxMy4yNjIsInN1YiI6IjY3ZTQ0MTc1N2I3MzEzYjVhZWYwYzQwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oLxomwkrakkfmk6VlbyhcaCngeWvy-kao09x3slABiw';
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'accept': 'application/json'
    },
    params: {
        api_key: API_KEY,
    },
});

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';