import React from 'react'
import homeImage from '../assets/amusementpark.svg';
import { SearchFormEN } from '../components'
import { Grid, Typography } from '@mui/material';
import NavbarEN from '../components/NavbarEN';

const Home = () => {
  return (
    <div>
        <NavbarEN />
        <Typography variant="h5" color="primary" sx={{mt: 3, mb: 3}}>Generate an optimized schedule for Tokyo Disney Resort!</Typography>
        <img src={homeImage} width={500} />
        <Grid sx={{ mb: 5}} container justifyContent = "center">
         <SearchFormEN />
        </Grid>
    </div>
  )
}

export default Home;