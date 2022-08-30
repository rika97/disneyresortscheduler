import React from 'react'
import homeImage from '../assets/amusementpark.svg';
import { SearchForm } from '../components'
import { Grid, Typography } from '@mui/material';

const Home = () => {
  return (
    <div>
        <Typography variant="h5" color="primary" sx={{mt: 3, mb: 3}}>Tokyo Disney Resort Scheduler</Typography>
        <img src={homeImage} width={500} />
        <Grid sx={{ mb: 5}} container justifyContent = "center">
         <SearchForm />
        </Grid>
    </div>
  )
}

export default Home;