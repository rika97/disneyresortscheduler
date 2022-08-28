import React from 'react';

const Calculator = () => {
  const currentTime = 0
  const waitTimesMatrix = {
    cols: ['8:00-8:30', '8:30-9:00', '9:00-9:30', '9:30-10:00', '10:00-10:30', '10:30-11:00', 
      '11:00-11:30', '11:30-12:00', '12:00-12:30', '12:30-13:00', '13:00-13:30', '13:30-14:00', 
      '14:00-14:30', '14:30-15:00', '15:00-15:30', '15:30-16:00', '16:00-16:30', '16:30-17:00',
      '17:00-17:30', '17:30-18:00', '18:00-18:30', '18:30-19:00', '19:00-19:30', '19:30-20:00', 
      '20:00-20:30', '20:30-21:00'],
    rows: ['Row1', 'Row2'],
    data: [[1, 2], [3, 4]]
  }

  const Aquatopia = [5, 10, 15]
  const Towerofterror = [50, 40, 70]
  const Indyjones = [10, 20, 60]
  const Attractions = [Aquatopia, Towerofterror, Indyjones]
  const minWait = {}
  minWait["Aquatopia"] = Math.min.apply(Math, Aquatopia)
  minWait["Towerofterror"] = Math.min.apply(Math, Towerofterror)
  minWait["Indyjones"] = Math.min.apply(Math, Indyjones)
  const values = Object.values(minWait);
  const max = Math.max(...values);
  console.log(max);

  return (
    <div>
        <h2>Calculator</h2>

    </div>
  )
}

export default Calculator