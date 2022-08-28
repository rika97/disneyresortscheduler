import React from 'react'
import homeImage from '../assets/amusementpark.svg';
import { SearchForm } from '../components'
import { Grid } from '@mui/material';

const Home = () => {
  return (
    <div>
        <h2>Tokyo Disney Resort Scheduler</h2>
        <img src={homeImage} width={500} />
        <Grid container justifyContent = "center">
         <SearchForm />
        </Grid>

    </div>
  )
}

export default Home