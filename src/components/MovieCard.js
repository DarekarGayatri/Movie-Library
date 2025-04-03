import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Tooltip } from '@mui/material';
import { ThumbUp, ThumbUpOutlined, VideoLibrary, VideoLibraryOutlined } from '@mui/icons-material';
import { IMAGE_BASE_URL } from '../api/tmdb';

function MovieCard({ movie }) {
    const [isLiked, setIsLiked] = React.useState(false);
    const [isInWatchlist, setIsInWatchlist] = React.useState(false);

    const toggleLike = () => {
        const likes = JSON.parse(localStorage.getItem('likes') || '[]');
        if (isLiked) {
            const newLikes = likes.filter(m => m.id !== movie.id);
            localStorage.setItem('likes', JSON.stringify(newLikes));
        } else {
            likes.push(movie);
            localStorage.setItem('likes', JSON.stringify(likes));
        }
        setIsLiked(!isLiked);
    };

    const toggleWatchlist = () => {
        const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
        if (isInWatchlist) {
            const newWatchlist = watchlist.filter(m => m.id !== movie.id);
            localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
        } else {
            watchlist.push(movie);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
        }
        setIsInWatchlist(!isInWatchlist);
    };

    React.useEffect(() => {
        const likes = JSON.parse(localStorage.getItem('likes') || '[]');
        const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
        setIsLiked(likes.some(m => m.id === movie.id));
        setIsInWatchlist(watchlist.some(m => m.id === movie.id));
    }, [movie.id]);

    return (
        <Card sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            backgroundColor: 'background.paper',
            '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.2s',
            },
        }}>
            <CardMedia
                component="img"
                height="300"
                image={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '/placeholder.png'}
                alt={movie.title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                    {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {movie.release_date?.split('-')[0]}
                </Typography>
            </CardContent>
            <CardActions>
                <Tooltip title="Like">
                    <IconButton onClick={toggleLike} color="primary">
                        {isLiked ? <ThumbUp /> : <ThumbUpOutlined />}
                    </IconButton>
                </Tooltip>
                <Tooltip title="Add to Watchlist">
                    <IconButton onClick={toggleWatchlist} color="secondary">
                        {isInWatchlist ? <VideoLibrary /> : <VideoLibraryOutlined />}
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
}

export default MovieCard;