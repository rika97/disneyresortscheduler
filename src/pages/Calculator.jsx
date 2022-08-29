import React from 'react';
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';

import axios from "axios";


const Calculator = () => {
  const [info, getInfo ] = useState();
  useEffect(() => {
    fetchData("958", "2022-08-30");
    fetchData("922", "2022-08-30");
    fetchData("952", "2022-08-30");
    fetchData("949", "2022-08-30");
    fetchData("964", "2022-08-30");
    fetchData("961", "2022-08-30");
    fetchData("916", "2022-08-30");
    fetchData("973", "2022-08-30");
    fetchData("970", "2022-08-30");
    fetchData("925", "2022-08-30");
    fetchData("913", "2022-08-30");
    fetchData("994", "2022-08-30");
    fetchData("910", "2022-08-30");
    fetchData("940", "2022-08-30");
    fetchData("937", "2022-08-30");
    fetchData("943", "2022-08-30");
    fetchData("997", "2022-08-30");
    fetchData("955", "2022-08-30");
    fetchData("988", "2022-08-30");
    fetchData("991", "2022-08-30");
    fetchData("967", "2022-08-30");
    fetchData("976", "2022-08-30");
    fetchData("934", "2022-08-30");
    fetchData("919", "2022-08-30");
    fetchData("982", "2022-08-30");
    fetchData("979", "2022-08-30");
    fetchData("946", "2022-08-30");
    fetchData("928", "2022-08-30");
}, []);


  // API test
  let waitList = []
  const fetchData = (attractionId, dateId) => {
    return axios.get(`http://localhost:5000/${attractionId}/${dateId}`)
          .then((response) => {
            const data = response.data;
            waitList.push(data)
            getInfo(waitList);
          } );}

  console.log(info)


  const waitTimesMatrix = {
    cols: [800, 830, 900, 930, 1000, 1030, 1100, 1130, 1200, 1230, 1300, 1330, 1400, 1430, 1500, 1530, 1600, 1630,
            1700, 1730, 1800, 1830, 1900, 1930, 2000, 2030, 2100, 2130],
    rows: ['Aquatopia', 'Indy Jones Adventure: Temple of the Crystal Skull', 'Electric Railway (American Waterfront)',
            'Electric Railway (Port Discovery)', 'Caravan Carousel', "Sindbad's Storybook Voyage", "Jasmine's Flying Carpet",
            'Jumping Jellyfish', "Skuttle's Scooter", "Journey to the Center of the Earth", 'Soarin: Fantastic Flight',
            'Turtle Talk', 'Toy Story Mania', 'Transit Steamer Line (American Waterfront)', 'Transit Steamer Line (Mediterranean Harbour)',
            'Transit Steamer Line (Lost River Delta)', 'Nemo and Friends Sea Rider', 'Big City Vehicle', 'Fortress Exploration', 'Leonardo Challenge',
            "Flounder's Flying Fish", 'Blowfish Balloon Race', 'Magic Lamp Theatre', 'Mermaid Lagoon Theatre', 'Raging Sprits', 'Whirlpool', 
            'Venetian Gondola', '20,000 Leagues Under the Sea'],
    data: 
      [[10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [30, 20, 30, 20, 40, 80, 10, 5, 70, 30, 40, 20, 30, 25, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 40, 5, 70, 60, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 15, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 60, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 40, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 30, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5],
      [10, 20, 30, 20, 40, 60, 10, 5, 70, 30, 40, 20, 30, 15, 25, 30, 45, 30, 50, 40, 35, 20, 10, 10, 20, 20, 30, 5]
    ]
  }


  // user input, max cap at 15
  const numberOfRides = 15;

  // schedule generator
  const userSchedule = [];

  while (Object.keys(userSchedule).length < numberOfRides) {

    // Get the maximum of minimum wait times for each attraction
    const maxWait = {
      timeFrame: '',
      attraction: '',
      waitTime: 0,
    };
  
    for (let i=0; i < waitTimesMatrix["data"].length; i++) {
      const minWait = Math.min.apply(Math, waitTimesMatrix["data"][i])
      if (minWait > maxWait["waitTime"]) {
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
    userSchedule.push([timeWindow, maxWait["attraction"], maxWait["waitTime"] ])

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
  }

  return (
    <div>
        <h2>Calculator</h2>
        {Object.entries(userSchedule.sort(function(a, b) {
          return a[0][0] - b[0][0];
        })).map(([key, value]) => (
        <Typography key={key}> {value[0][0]}~{value[0][1]}: {value[1]}, {value[2]} mins</Typography>
      ))}
    </div>
  )
}

export default Calculator;