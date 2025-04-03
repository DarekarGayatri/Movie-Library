import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import MovieCard from './MovieCard';

function Watchlist() {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
        setWatchlist(savedWatchlist);
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                My Watchlist
            </Typography>
            <Grid container spacing={3}>
                {watchlist.map((movie) => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                        <MovieCard movie={movie} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Watchlist;