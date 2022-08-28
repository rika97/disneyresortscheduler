import * as React from 'react';

import { Stack, TextField, Autocomplete, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function SearchForm() {
  const today = new Date();
  const [park, setPark] = React.useState("");
  const [method, setMethod] = React.useState("");
  const [date, setDate] = React.useState(today);
  const [entryTime, setEntryTime] = React.useState(today);
  const [leaveTime, setLeaveTime] = React.useState(today);
  
  return (
    <div>  
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}  sx={{ width: 400 }}>
          <Autocomplete
            disablePortal
            options={["Tokyo Disneyland", "Tokyo DisneySea"]}
            label="Park"
            value={park}
            onChange={(event, newPark) => {
              setPark(newPark);
            }}
            renderInput={(params) => <TextField {...params} label="Park" />}
          />
          <DatePicker
            label="Entry Date"
            value={date}
            onChange={(newDate) => {
              setDate(newDate);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            label="Entry Time"
            value={entryTime}
            onChange={(newTime) => {
              setEntryTime(newTime);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            label="Leave Time"
            value={leaveTime}
            onChange={(newTime) => {
              setLeaveTime(newTime);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <Autocomplete
            disablePortal
            options={["Minimize Walking Distance", "Maximize Number of Rides"]}
            label="Algorithm"
            value={method}
            onChange={(event, newMethod) => {
              setMethod(newMethod);
            }}
            renderInput={(params) => <TextField {...params} label="Calculation Method" />}
          />
          <Button variant="contained" endIcon={<AutoAwesomeIcon />}>
            Enter
          </Button>
        </Stack>
      </LocalizationProvider>
    </div>

  );
}
