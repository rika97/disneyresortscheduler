import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
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
            東京ディズニーリゾート・スケジュール計画サイト
          </Typography>
          <Button color="inherit" onClick={()=>{navigate("/en")}}> <LanguageIcon />English</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar