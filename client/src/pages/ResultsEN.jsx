import React from 'react';
import { Typography, Paper, CircularProgress, Box, Button, Grid } from '@mui/material';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import seaAttractionDictEN from '../components/SeaAttractionDictEN';
import landAttractionDictEN from '../components/LandAttractionDictEN';
import NavbarEN from '../components/NavbarEN';


const Results = () => {
    const [displayHeader, setDisplayHeader] = useState('');
    const [displayData, setDisplayData] = useState('');
    const [stopAttraction, setStopAttraction] = useState([]);
    const [stopShow, setStopShow] = useState([]);
    const [stopGreeting, setStopGreeting] = useState([]);
    const [stopShop, setStopShop] = useState([]);
    const [stopRestaurant, setStopRestaurant] = useState([]);
    const [stopService, setStopService] = useState([]);
    const [forecastData, setForecastData] = useState(["N/A", "N/A", "N/A", "N/A"]);
    const [isLoading, setIsLoading] = useState('true');
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
      fetchData()
    }, [])

    const openTimes = [800, 830, 900, 930, 1000, 1030, 1100, 1130, 1200, 1230, 1300, 1330, 1400, 1430, 1500, 1530, 1600, 1630,
      1700, 1730, 1800, 1830, 1900, 1930, 2000, 2030, 2100, 2130];

    const formatTime = (time) => {
      return String(time).replace(/(.{2})$/,':$1')
    };


    const fetchData = async () => {
 
      let waitList = [];
      const entryTime = location.state.entryTime;
      const leaveTime = location.state.leaveTime;
      const dateId = location.state.dateId;
      const park = location.state.park;
      const attractionOptions = location.state.attractionOptions;
      let attractionDict = {};

      // Weather Scraper
      axios.get(`http://localhost:5000/forecast/${dateId}`).then((response) => {

        setForecastData(response.data);
      });

      // Stopped Attractions Scraper
      if (park === "TokyoDisneyland 🏰") {
        axios.get(`http://localhost:5000/landStopEN/${dateId}`).then((response) => {
          setStopAttraction(response.data[0]);
          setStopShow(response.data[1]);
          setStopGreeting(response.data[2]);
          setStopShop(response.data[3]);
          setStopRestaurant(response.data[4]);
          setStopService(response.data[5]);

      });
      } else {
        axios.get(`http://localhost:5000/seaStopEN/${dateId}`).then((response) => {
          setStopAttraction(response.data[0]);
          setStopShow(response.data[1]);
          setStopGreeting(response.data[2]);
          setStopShop(response.data[3]);
          setStopRestaurant(response.data[4]);
          setStopService(response.data[5]);
      });
      }

      // Schedule Generator
      if (park === "Tokyo Disneyland 🏰") {
        for (let i=0; i < attractionOptions.length; i++) {
          attractionDict[attractionOptions[i]] = landAttractionDictEN[attractionOptions[i]]
        }
      } else {
        for (let i=0; i < attractionOptions.length; i++) {
          attractionDict[attractionOptions[i]] = seaAttractionDictEN[attractionOptions[i]]
        }
      };

      const entryTimeIndex = openTimes.indexOf(entryTime)
      // minus 1 since attractions close queues 30 min before
      const leaveTimeIndex = openTimes.indexOf(leaveTime)-1


      // assumes one ride can be attained within 30 minutes. Number of Rides is whichever smaller, 
      // users' input or a physically attainable number.
      const numberOfRides = Math.min(attractionOptions.length, leaveTimeIndex-entryTimeIndex);


      for (let i=0; i < Object.values(attractionDict).length; i++) {
        const {data} = await axios.get(`http://localhost:5000/waitTimes/${Object.values(attractionDict)[i]}/${dateId}`)
        const availableTimesData = data.splice(entryTimeIndex, leaveTimeIndex-entryTimeIndex+1)
        waitList.push(availableTimesData)
      }

      
      const availableTimesList = openTimes.splice(entryTimeIndex, leaveTimeIndex-entryTimeIndex+1)
      
          
      const waitTimesMatrix = {
        cols: availableTimesList,
        rows: Object.keys(attractionDict),
        data: waitList
      };

      
      let userSchedule = [];

      while (Object.keys(userSchedule).length < numberOfRides) {

        // Get the maximum of minimum wait times for each attraction
        const maxWait = {
          timeFrame: '',
          attraction: '',
          waitTime: 0,
        };

        for (let i=0; i < waitTimesMatrix["data"].length; i++) {
          const minWait = Math.min.apply(Math, waitTimesMatrix["data"][i])
          if (minWait >= maxWait["waitTime"]) {
            maxWait["attraction"] = waitTimesMatrix["rows"][i]
            maxWait["waitTime"] =  minWait
            const index = waitTimesMatrix["data"][i].indexOf(minWait)
            maxWait["timeFrame"] = waitTimesMatrix["cols"][index]
          }
        };

        // assume 15 minutes for ride experience + walking between attractions, round up to the closest 30min/hour
        const totalTime = (Math.floor((maxWait["waitTime"]+14)/30)+1)*30
        const startTime = maxWait["timeFrame"]
        const endTimeHour = Math.floor(startTime/100) + Math.floor(totalTime/60) + Math.floor((startTime%100 + totalTime%60)/60)
        const endTimeMin = (startTime%100+totalTime%60)%60
        const endTime = endTimeHour*100+endTimeMin
        const timeWindow = [startTime, endTime]
        if ((maxWait["waitTime"] !== Infinity)) {
          userSchedule.push([timeWindow, maxWait["attraction"], maxWait["waitTime"] ])
        }
        

        // delete this ride from matrix
        const rideIndex = waitTimesMatrix["rows"].indexOf(maxWait["attraction"])
        waitTimesMatrix["data"].splice(rideIndex, 1)
        waitTimesMatrix["rows"].splice(rideIndex, 1)
        
        // delete all time blocks scheduled for this ride
        const startTimeIndex = waitTimesMatrix["cols"].indexOf(startTime)
        let endTimeIndex = 0
        if (endTime >= 2200) {
          endTimeIndex = startTimeIndex+1
        } else {
          endTimeIndex = startTimeIndex + (Math.floor((maxWait["waitTime"]+19)/30)+1)
        }

        waitTimesMatrix["cols"].splice(startTimeIndex, endTimeIndex-startTimeIndex)
        for (let i=0; i < waitTimesMatrix["data"].length; i++) {
          waitTimesMatrix["data"][i].splice(startTimeIndex, endTimeIndex-startTimeIndex)
        };
      };

      // print everything without NaN data
      const displaySchedule = [];
      for (let i=0; i < userSchedule.length; i++) {
        if (userSchedule[i][1] !== '') {
          displaySchedule.push(userSchedule[i])
        }
      };

      displaySchedule.sort(function(a, b) {
        return a[0][0] - b[0][0];
      });

      setDisplayData(displaySchedule);
      setDisplayHeader([park, dateId, formatTime(entryTime), formatTime(leaveTime)]);
      setIsLoading(false);
    
      
      };

      if(isLoading) {
        return (
        <Paper elevation={0}>
          <Box sx={{mt: 20}}display="flex" alignItems="center" justifyContent="center">
            <CircularProgress size="7em" />
          </Box>
          <Box sx={{mt: 5}} display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h4" color="primary">Loading...🎡🎢🎠</Typography>
          </Box>
        </Paper>
        );
      };



  return (
    <div>
        <NavbarEN />
        <Grid sx={{ mb:4, ml: 2, mr: 2}}>
          <Typography variant="h4" color="primary" sx={{mt: 3}}>Suggested Schedule</Typography>
          <Typography sx={{mt: 1}} variant="h5">{displayHeader[0]}</Typography>
          <Typography variant="h6">Scheduled Date: {displayHeader[1]}, {displayHeader[2]}~{displayHeader[3]}</Typography>
          <Typography sx={{mb: 2}} color="secondary">Temperature: {forecastData[2]} (High), {forecastData[3]} (Low), Chance of Rain: {forecastData[1]}</Typography>
          {Object.entries(displayData).map(([key, value]) => (
          <Typography key={key}> {formatTime(value[0][0])}~{formatTime(value[0][1])}: {value[1]} ({value[2]} mins)</Typography>
        ))}
          <Typography variant="body2" color="primary" sx={{ mt: 3, mb: 3}}>(Wait times are merely predictions.)</Typography>
          <Button width="500px" style={{ width: 200 }} variant="contained" onClick={()=>{navigate('/')}}>Go back</Button>
          <Typography sx={{mt: 3}} variant="h6">Temporary Closure Info:</Typography>
          <Typography color="secondary" sx={{ mt: 2}}>Attractions</Typography>
          {Object.entries(stopAttraction).map(([key, value]) => (
          <Typography variant="body2" key={key}>{value}</Typography>
          ))}
          <Typography color="secondary" sx={{ mt: 2}}>Parades and Shows</Typography>
          {Object.entries(stopShow).map(([key, value]) => (
          <Typography variant="body2" key={key}>{value}</Typography>
          ))}
          <Typography color="secondary" sx={{ mt: 2}}>Disney Character Greetings</Typography>
          {Object.entries(stopGreeting).map(([key, value]) => (
          <Typography variant="body2" key={key}>{value}</Typography>
          ))}
          <Typography color="secondary" sx={{ mt: 2}}>Shops</Typography>
          {Object.entries(stopShop).map(([key, value]) => (
          <Typography variant="body2" key={key}>{value}</Typography>
          ))}
          <Typography color="secondary" sx={{ mt: 2}}>Restaurants</Typography>
          {Object.entries(stopRestaurant).map(([key, value]) => (
          <Typography variant="body2" key={key}>{value}</Typography>
          ))}
          <Typography color="secondary" sx={{ mt: 2}}>Guest Services</Typography>
          {Object.entries(stopService).map(([key, value]) => (
          <Typography variant="body2" key={key}>{value}</Typography>
          ))}
        </Grid>
    </div>
  )
}

export default Results;