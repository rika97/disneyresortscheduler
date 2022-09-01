import React from 'react';
import homeImage from '../assets/amusementpark.svg';
import { SearchFormEN } from '../components'
import { Grid, Typography } from '@mui/material';
import NavbarEN from '../components/NavbarEN';
import FooterEN from '../components/FooterEN';

const Home = () => {
  return (
    <div>
        <NavbarEN />
        <Grid>
          <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
            Generate an optimized itinerary for a day at Tokyo Disney Resort!
          </Typography>
          <Typography variant="subtitle1" sx={{mt: 1, mb: 3, }}>
            Begin by selecting a park, a date and some attractions.
          </Typography>
        </Grid>
        <img src={homeImage} width={500} />
        <Grid sx={{ mb: 5}} container justifyContent = "center">
         <SearchFormEN />
        </Grid>
        <FooterEN />
    </div>
  )
}

export default Home;