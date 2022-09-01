import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Grid, Link } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate } from 'react-router-dom';
import castleIcon from '../assets/castleIcon.png';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid onClick={()=>{navigate('/')}}>
           <img src={castleIcon} alt="Logo" />
          </Grid>
          <Link underline="none" variant="body2" color='#ffffff' href="/">ディズニー 行動計画自動作成プログラム</Link>
          <Button sx={{ ml: "auto" }} color="inherit" onClick={()=>{navigate("/en")}}> <LanguageIcon />English</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar;