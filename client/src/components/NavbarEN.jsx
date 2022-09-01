import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Grid, Link } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate } from 'react-router-dom';
import castleIcon from '../assets/castleIcon.png';

const NavbarEN = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid onClick={()=>{navigate('/en')}}>
           <img src={castleIcon} alt="Logo" />
          </Grid>
  
          <Link underline="none" variant="body1" color='#ffffff' href="/en">Tokyo Disney Resort Schedule Generator</Link>
          <Button sx={{ ml: "auto" }} color="inherit" onClick={()=>{navigate("/")}}> <LanguageIcon />日本語</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavbarEN;