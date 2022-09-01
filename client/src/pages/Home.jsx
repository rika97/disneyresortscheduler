import React from 'react'
import homeImage from '../assets/amusementpark.svg';
import { SearchForm } from '../components'
import { Grid, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
        <Navbar />
        <Grid>
          <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
            東京ディズニーリゾートのアトラクションを効率よく巡るスケジュールを自動で算出します！
          </Typography>
          <Typography variant="subtitle2" sx={{mt: 1, mb: 3, }}>
            まずはパークと来園日とアトラクションを選択して検索してみましょう
          </Typography>
        </Grid>
        <img src={homeImage} width={500} />
        <Grid sx={{ mb: 5 }} container justifyContent = "center">
         <SearchForm />
        </Grid>
        <Footer />
    </div>
  )
}

export default Home;