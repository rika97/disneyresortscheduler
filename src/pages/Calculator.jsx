import React from 'react';
import { Typography } from '@mui/material';


const Calculator = () => {
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
  console.log(userSchedule)
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