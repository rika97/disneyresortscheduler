import React from 'react';
import { Typography, Paper, CircularProgress, Box, Button, Grid } from '@mui/material';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import seaAttractionDict from '../components/SeaAttractionDict';
import landAttractionDict from '../components/LandAttractionDict';
import Navbar from '../components/Navbar';


const Results = () => {
    const [displayHeader, setDisplayHeader] = useState('');
    const [displayData, setDisplayData] = useState('');
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
    }

    const fetchData = async () => {
 
      let waitList = [];
      const entryTime = location.state.entryTime;
      const leaveTime = location.state.leaveTime;
      const dateId = location.state.dateId;
      const park = location.state.park;
      const attractionOptions = location.state.attractionOptions;
      let attractionDict = {};


      if (park === "東京ディズニーランド 🏰") {
        for (let i=0; i < attractionOptions.length; i++) {
          attractionDict[attractionOptions[i]] = landAttractionDict[attractionOptions[i]]
        }
      } else {
        for (let i=0; i < attractionOptions.length; i++) {
          attractionDict[attractionOptions[i]] = seaAttractionDict[attractionOptions[i]]
        }
      };

      const entryTimeIndex = openTimes.indexOf(entryTime)
      // minus 1 since attractions close queues 30 min before
      const leaveTimeIndex = openTimes.indexOf(leaveTime)-1


      // assumes one ride can be attained within 30 minutes. Number of Rides is whichever smaller, 
      // users' input or a physically attainable number.
      const numberOfRides = Math.min(attractionOptions.length, leaveTimeIndex-entryTimeIndex);


      for (let i=0; i < Object.values(attractionDict).length; i++) {
        const {data} = await axios.get(`http://localhost:5000/${Object.values(attractionDict)[i]}/${dateId}`)
        const availableTimesData = data.splice(entryTimeIndex, leaveTimeIndex-entryTimeIndex+1)
        waitList.push(availableTimesData)
      }

      
      const availableTimesList = openTimes.splice(entryTimeIndex, leaveTimeIndex-entryTimeIndex+1)
      
          
      const waitTimesMatrix = {
        cols: availableTimesList,
        rows: Object.keys(attractionDict),
        data: waitList
      };

      // schedule generator
      
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
            <Typography variant="h4" color="primary">しばらくお待ちください🎡🎢🎠</Typography>
          </Box>
        </Paper>
        );
      };



  return (
    <div>
        <Navbar />
        <Grid sx={{ mb:4 }}>
          <Typography variant="h4" color="primary" sx={{mt: 4}}>おすすめスケジュール</Typography>
          <Typography sx={{mt: 1}} variant="h6">{displayHeader[0]}</Typography>
          <Typography variant="h6">{displayHeader[1]}</Typography>
          <Typography sx={{mb: 2}} variant="h6">{displayHeader[2]}~{displayHeader[3]}</Typography>
          {Object.entries(displayData).map(([key, value]) => (
          <Typography key={key}> {formatTime(value[0][0])}~{formatTime(value[0][1])}: {value[1]} ({value[2]}分)</Typography>
        ))}
          <Typography variant="body2" color="primary" sx={{ mt: 3, mb: 3}}>（待ち時間はあくまでも予想です。）</Typography>
          <Button variant="outlined" onClick={()=>{navigate('/')}}>戻る</Button>
        </Grid>
    </div>
  )
}

export default Results;