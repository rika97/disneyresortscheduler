import React from 'react';
import { Typography, Paper, CircularProgress, Box } from '@mui/material';
import axios from "axios";
import { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';


const Results = () => {
    const [displayHeader, setDisplayHeader] = useState('');
    const [displayData, setDisplayData] = useState('');
    const [isLoading, setIsLoading] = useState('true');
    const location = useLocation();


    useEffect(() => {
      fetchData()
    }, [])
    
    const seaAttractionIdList = ["958", "922", "952", "949", "964", "961", "916", "973", "970", "925", "913", "994",
                              "910", "940", "937", "943", "997", "955", "988", "991", "967", "976", "934", "919", "982",
                            "979", "946", "928"];

    const seaAttractionNamesList = ['Aquatopia', 'Indy Jones Adventure: Temple of the Crystal Skull', 'Electric Railway (American Waterfront)',
    'Electric Railway (Port Discovery)', 'Caravan Carousel', "Sindbad's Storybook Voyage", "Jasmine's Flying Carpet",
    'Jumping Jellyfish', "Skuttle's Scooter", "Journey to the Center of the Earth", 'Soarin: Fantastic Flight',
    'Turtle Talk', 'Toy Story Mania', 'Transit Steamer Line (American Waterfront)', 'Transit Steamer Line (Mediterranean Harbour)',
    'Transit Steamer Line (Lost River Delta)', 'Nemo and Friends Sea Rider', 'Big City Vehicle', 'Fortress Exploration', 'Leonardo Challenge',
    "Flounder's Flying Fish", 'Blowfish Balloon Race', 'Magic Lamp Theatre', 'Mermaid Lagoon Theatre', 'Raging Sprits', 'Whirlpool', 
    'Venetian Gondola', '20,000 Leagues Under the Sea'];

    const landAttractionIdList = ["853", "775", "772", "727", '718', '709', '712', '730', '793', '766', '799', '754', '715',
                                  '721', '805', '841', '742', '808', '790', '739', '796', '811', '736', '745', '760', '748',
                                  '778', '844', '829', '769', '757', '784', '823', '781', '751', '763', '847', '733', '724'];

    const landAttractionNamesList = ['Photo Location: Happy Fair Labo', "Alice's Tea Party", "It's a Small World",
    "Western Land Shooting Gallery", "Western River Railroad", "Omnibus", 'Pirates of the Carribean', 'Country Bear Theatre',
    "Gadget's Go Coaster", 'Castle Carousel', "Goofy's Paint 'n' Play House", "Cinderella's Fairytale Hall", 'Jungle Cruise',
    'Swiss Family Tree House', 'Star Tours', 'Stitch Encounter', 'Splash Mountain', 'Space Mountain', "Chip 'n Dale's Treehouse",
    'Tom Sawyer Island Rafts', "Donald's Boat", "Buzz Lightyear's Astro Blasters", 'Big Thunder Mountain', 'Beaver Brothers Explorer Canoes',
    "Pinocchio's Daring Journey", "Peter Pan's Flight", "Pooh's Hunny Hunt", "The Happy Ride with Baymax", "Penny Arcade", "Haunted Mansion",
    "Mickey's PhilharMagic", "Minnie's House", "Monsters, Inc. Ride & Go Seek", "Roger Rabbit's Car Toon Spin", "Snow White's Adventures",
    "Dumbo the Flying Elephant", "Enchanted Tale of Beauty and the Beast", "Mark Twain Riverboat", "The Enchanted Tiki Room"];

    const openTimes = [800, 830, 900, 930, 1000, 1030, 1100, 1130, 1200, 1230, 1300, 1330, 1400, 1430, 1500, 1530, 1600, 1630,
      1700, 1730, 1800, 1830, 1900, 1930, 2000, 2030, 2100, 2130];


    const fetchData = async () => {
 
      let waitList = [];
      const entryTime = location.state.entryTime;
      const leaveTime = location.state.leaveTime;
      const dateId = location.state.dateId;
      const park = location.state.park;
      let attractionIdList = ""
      let attractionNamesList = ""

      if (park === "Tokyo DisneySea") {
        attractionIdList = seaAttractionIdList;
      } else {
        attractionIdList = landAttractionIdList;
      };

      if (park === "Tokyo DisneySea") {
        attractionNamesList = seaAttractionNamesList;
      } else {
        attractionNamesList = landAttractionNamesList;
      };


      const entryTimeIndex = openTimes.indexOf(entryTime)
      // minus 1 since attractions close queues 30 min before
      const leaveTimeIndex = openTimes.indexOf(leaveTime)-1

      // assumes one ride can be attained within 30 minutes. Number of Rides is whichever smaller, 
      // users' input or a physically attainable number.
      const numberOfRides = Math.min(location.state.numberOfRides, leaveTimeIndex-entryTimeIndex);


      for (let i=0; i < attractionIdList.length; i++) {
        const {data} = await axios.get(`http://localhost:5000/${attractionIdList[i]}/${dateId}`)
        const availableTimesData = data.splice(entryTimeIndex, leaveTimeIndex-entryTimeIndex+1)
        waitList.push(availableTimesData)
      }

      
      const availableTimesList = openTimes.splice(entryTimeIndex, leaveTimeIndex-entryTimeIndex+1)

          
      const waitTimesMatrix = {
        cols: availableTimesList,
        rows: attractionNamesList,
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
      setDisplayHeader([park, dateId, entryTime, leaveTime]);
      setIsLoading(false);
      };

      if(isLoading) {
        return (
        <Paper elevation={0}>
          <Box sx={{mt: 20}}display="flex" alignItems="center" justifyContent="center">
            <CircularProgress size="7em" />
          </Box>
          <Box sx={{mt: 5}} display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h4" color="primary">Loading Results 🎡🎢🎠</Typography>
          </Box>
        </Paper>
        );
      };




  return (
    <div>
        <Typography variant="h4" color="primary" sx={{mt: 7}}>Suggested Plan</Typography>
        <Typography sx={{mt: 2}} variant="h6">{displayHeader[0]}</Typography>
        <Typography sx={{mb: 5}} variant="h6">{displayHeader[1]} {displayHeader[2]}~{displayHeader[3]}</Typography>
        {Object.entries(displayData).map(([key, value]) => (
        <Typography key={key}> {value[0][0]}~{value[0][1]}: {value[1]} ({value[2]} mins)</Typography>
      ))}
    </div>
  )
}

export default Results;