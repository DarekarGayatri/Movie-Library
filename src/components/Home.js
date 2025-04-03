import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, MenuItem, Box, CircularProgress } from '@mui/material';
import { tmdbApi } from '../api/tmdb';
import MovieCard from './MovieCard';

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(() => {
        fetchMovies();
        fetchGenres();
    }, []);

    const fetchMovies = async (searchQuery = '') => {
        try {
            setLoading(true);
            const endpoint = searchQuery ? '/search/movie' : '/movie/popular';
            const response = await tmdbApi.get(endpoint, {
                params: { query: searchQuery },
            });
            setMovies(response.data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchGenres = async () => {
        try {
            const response = await tmdbApi.get('/genre/movie/list');
            setGenres(response.data.genres);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value) {
            fetchMovies(event.target.value);
        } else {
            fetchMovies();
        }
    };

    const filteredMovies = selectedGenre
        ? movies.filter(movie => movie.genre_ids.includes(parseInt(selectedGenre)))
        : movies;

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Search movies"
                            value={search}
                            onChange={handleSearch}
                            sx={{ bgcolor: 'background.paper' }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            select
                            label="Filter by genre"
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                            sx={{ 
                                bgcolor: 'background.paper',
                                '& .MuiSelect-icon': {
                                    right: 8
                                }
                            }}
                        >
                            <MenuItem value="">All Genres</MenuItem>
                            {genres.map((genre) => (
                                <MenuItem key={genre.id} value={genre.id}>
                                    {genre.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={3}>
                {filteredMovies.map((movie) => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                        <MovieCard movie={movie} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Home;