import React from 'react'
import homeImage from '../assets/amusementpark.svg';
import { SearchForm } from '../components'
import { Grid, Typography } from '@mui/material';

const Home = () => {
  return (
    <div>
        <h2>Tokyo Disney Resort Scheduler</h2>
        <img src={homeImage} width={500} />
        <Grid container justifyContent = "center">
         <SearchForm />
        </Grid>

        {/* {Object.entries(thing.sort(function(a, b) {
          return a[0][0] - b[0][0];
        })).map(([key, value]) => (
        <Typography key={key}> {value[0][0]}~{value[0][1]}: {value[1]}, {value[2]} mins</Typography>
      ))} */}

    </div>
  )
}

export default Home