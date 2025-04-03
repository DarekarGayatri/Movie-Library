import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
                    Movie Library
                </Typography>
                <Button color="inherit" component={Link} to="/watchlist">
                    Watchlist
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;