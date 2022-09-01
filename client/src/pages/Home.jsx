import React from 'react'
import homeImage from '../assets/amusementpark.svg';
import { SearchForm } from '../components'
import { Grid, Typography } from '@mui/material';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div>
        <Navbar />
        <Typography variant="h6" color="primary" sx={{mt: 3, mb: 3, }}>
          東京ディズニーリゾートのアトラクションを待ち時間予想により、効率よく巡るスケジュールを自動で算出します！
        </Typography>
        <img src={homeImage} width={500} />
        <Grid sx={{ mb: 5}} container justifyContent = "center">
         <SearchForm />
        </Grid>
    </div>
  )
}

export default Home;