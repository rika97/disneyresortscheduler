import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate } from 'react-router-dom';

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tokyo Disney Resort Scheduler
          </Typography>
          <Button color="inherit" onClick={()=>{navigate("/")}}> <LanguageIcon />日本語</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavbarEN;