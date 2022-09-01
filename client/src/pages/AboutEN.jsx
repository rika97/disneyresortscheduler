import React from 'react';
import { Grid, Typography, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';

import NavbarEN from '../components/NavbarEN';

const AboutEN = () => {
    const navigate = useNavigate();
  return (
    <div>
        <NavbarEN />
        <Grid sx={{ ml: "15%", mr: "15%", mb: 4 }}>
            <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
                The Algorithm
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
                This website scrapes predicted wait times data from other sites and iterates through the process of:
                 1. Search for the attraction that has the longest wait time that day.
                 2. Identify the time frame in which this attraction has its minimum waiting time.
                 3. Add that attraction and time frame to the user schedule and repeat steps 1-3 until a full schedule is attained.
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
                For each of the attractions, the sum of predicted wait time and 30 minutes (ride time + some extra time) is reserved. 
                This is due to the longest ride time being 30 minutes (Turtle Talk at Tokyo DisneySea.) Since predicted wait times are given by
                30-minute inetrvals, suggested time frames are also given by 30-minute intervals and the expected finish time for each attraction is rounded up to the nearest half an hour to 
                give some extra time considering fluctuations.
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
                Also, waiting lines are assumed to close 30 minutes prior to the closing time. (Although, one should be aware that popular rides such as Toy Story Mania!, Tower of Terror, Enchanted Tale of Beauty and the Beast, etc usually closes waiting lines an hour early.)
            </Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
                Contact
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
                Have a better algorithm suggestion? Or just have a random thought? Send us a message here!
            </Typography>
            <Link underline="none" variant="body2" color="primary" href="mailto:technotechapps@gmail.com?subject=%E3%80%90CONTACT%20FORM%E3%80%91Tokyo%20Disney%20Resort%20Scheduler"><Button variant="outlined" endIcon={<EmailIcon />} sx={{ mt: 1 }} >Email</Button></Link>
            <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                Source
            </Typography>
            <Typography variant="body2" sx={{ mb: 3}}>
                <a target="_blank" href="https://icons8.com/icon/12003/palace">Palace</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
            </Typography>
            <Button width="500px" style={{ width: 200 }} variant="contained" onClick={()=>{navigate('/en')}}>Go Back</Button>
        </Grid>
    </div>
  )
}

export default AboutEN;