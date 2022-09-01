import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Grid } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate } from 'react-router-dom';
import castleIcon from '../assets/castleIcon.png';

const NavbarEN = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
          </IconButton>
          <Grid >
           <img src={castleIcon} alt="Logo" />
          </Grid>
  
          <Typography sx={{ ml: 1, typography: { sm: 'h6', xs: 'body1' }}}>
            Tokyo Disney Resort Schedule Generator
          </Typography>
          <Button sx={{ ml: "auto" }} color="inherit" onClick={()=>{navigate("/")}}> <LanguageIcon />日本語</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavbarEN;