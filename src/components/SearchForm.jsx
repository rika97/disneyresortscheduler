import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Stack, TextField, Autocomplete, Button, Slider, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import moment from "moment";

import timeOptions from './TimeOptions';



export default function SearchFormEN() {
  const today = new Date();
  const currentTime = parseInt(moment(today).format('HH:mm').replace(":", ""));
  const [park, setPark] = React.useState("東京ディズニーシー 🌏");
  const [entryDate, setEntryDate] = React.useState(today);
  const [entryTime, setEntryTime] = React.useState(900);
  const [leaveTime, setLeaveTime] = React.useState(2100);
  const [warning, setWarning] = React.useState("");
  const [numberOfRides, setNumberOfRides] = React.useState(7);
  const navigate = useNavigate();


  const toResults=()=>{
    if (leaveTime <= entryTime) {
      setWarning("退園時刻は入園時刻よりも後でなければいけません")
    } else if ( (moment(entryDate.$d).format("YYYY-MM-DD") === moment(today).format("YYYY-MM-DD")) &&  (entryTime <= currentTime) ) {
      setWarning("入園時刻は現時刻よりも後でなければいけません")
    } else {
      navigate('/results',{state:{numberOfRides:numberOfRides, entryTime: entryTime, leaveTime: leaveTime,
                            dateId: moment(entryDate.$d).format("YYYY-MM-DD"), park: park}});
    }
  };



  return (
    <div>  
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={2}  sx={{ width: 400 }}>
          {/* Park */}
          <Autocomplete
            disablePortal
            value={park}
            options={["東京ディズニーランド 🏰", "東京ディズニーシー 🌏"]}
            label="パーク"
            onChange={(event, newPark) => {
              setPark(newPark);
            }}
            renderInput={(params) => <TextField {...params} label="パーク" placeholder='パークを選択'/>}
          />

          {/* Entry Date */}
          <DatePicker
            label="入園日"
            value={entryDate}
            minDate={today}
            inputFormat="YYYY-MM-DD"
            onChange={(newDate) => {
              setEntryDate(newDate);
            }}
            renderInput={(params) => <TextField {...params} />}
          />

          {/* Entry Time */}
          <Autocomplete
            disablePortal
            options={timeOptions}
            label="入園時刻"
            onChange={(event, newEntryTime) => {
              setEntryTime(newEntryTime?.timeValue);
            }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="入園時刻" placeholder='入園時刻'/>}
          />

          {/* Leave Time */}
          <Autocomplete
            disablePortal
            options={timeOptions}
            label="退園時刻"
            onChange={(event, newLeaveTime) => {
              setLeaveTime(newLeaveTime?.timeValue);
            }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="退園時刻" placeholder='退園時刻'/>}
          />

          {/* Number of Rides */}
          <Typography align="left" variant="subtitle1" gutterBottom>
          体験するアトラクションの最高数:
          </Typography>
          <Slider
            aria-label="体験するアトラクションの最高数"
            defaultValue={7}
            valueLabelDisplay="auto"
            step={1}
            min={1}
            max={15}
            onChange={(event, newNumber) => {
              setNumberOfRides(newNumber);
            }}
          />


          {/* Warning Field and Submit Button */}
          <Typography color="error" variant="body2">{warning}</Typography>
          <Button variant="contained" endIcon={<AutoAwesomeIcon />}
            onClick={()=>{toResults()}}>検索</Button>
        </Stack>
      </LocalizationProvider>
    </div>

  );
}
