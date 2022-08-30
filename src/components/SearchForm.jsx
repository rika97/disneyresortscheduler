import * as React from 'react';

import { Stack, TextField, Autocomplete, Button, Slider, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useNavigate } from 'react-router-dom';
import timeOptions from './TimeOptions';
import moment from "moment";

export default function SearchForm() {
  const today = new Date();
  const [park, setPark] = React.useState("Tokyo DisneySea");
  const [entryDate, setEntryDate] = React.useState(today);
  const [entryTime, setEntryTime] = React.useState(900);
  const [leaveTime, setLeaveTime] = React.useState(2100);
  const [warning, setWarning] = React.useState("");
  const [numberOfRides, setNumberOfRides] = React.useState(7);
  const navigate = useNavigate();


  const toResults=()=>{
    if (leaveTime <= entryTime) {
      setWarning("Leave time must be later than entry time!")
    } else {
      navigate('/results',{state:{numberOfRides:numberOfRides, entryTime: entryTime, leaveTime: leaveTime,
                            dateId: moment(entryDate.$d).format("YYYY-MM-DD"), park: park}});
    }
  };

  return (
    <div>  
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}  sx={{ width: 400 }}>
          {/* Park */}
          <Autocomplete
            disablePortal
            value={park}
            options={["Tokyo Disneyland", "Tokyo DisneySea"]}
            label="Park"
            onChange={(event, newPark) => {
              setPark(newPark);
            }}
            renderInput={(params) => <TextField {...params} label="Park" placeholder='Choose Park'/>}
          />

          {/* Entry Date */}
          <DatePicker
            label="Entry Date"
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
            label="Entry Time"
            onChange={(event, newEntryTime) => {
              setEntryTime(newEntryTime?.timeValue);
            }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="Park Entry Time" placeholder='Park Entry Time'/>}
          />

          {/* Leave Time */}
          <Autocomplete
            disablePortal
            options={timeOptions}
            label="Leave Time"
            onChange={(event, newLeaveTime) => {
              setLeaveTime(newLeaveTime?.timeValue);
            }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="Park Leave Time" placeholder='Park Leave Time'/>}
          />

          {/* Number of Rides */}
          <Typography align="left" variant="subtitle1" gutterBottom>
            Max. Number of Rides
          </Typography>
          <Slider
            aria-label="Number of Rides"
            defaultValue={7}
            valueLabelDisplay="auto"
            step={1}
            min={1}
            max={15}
            onChange={(event, newNumber) => {
              setNumberOfRides(newNumber);
            }}
          />
          <Typography color="error" variant="body2">{warning}</Typography>
          <Button variant="contained" endIcon={<AutoAwesomeIcon />} 
            onClick={()=>{toResults()}}>Enter</Button>
        </Stack>
      </LocalizationProvider>
    </div>

  );
}
