import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Stack, TextField, Autocomplete, Button, Typography, Checkbox } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import moment from "moment";
import axios from "axios";

import timeOptions from './TimeOptions';
import seaAttractionDictEN from './SeaAttractionDictEN';
import landAttractionDictEN from './LandAttractionDictEN';



export default function SearchFormEN() {
  const today = new Date();
  const currentTime = parseInt(moment(today).format('HH:mm').replace(":", ""));
  const [park, setPark] = React.useState("");
  const [entryDate, setEntryDate] = React.useState(today);
  const [entryTime, setEntryTime] = React.useState(900);
  const [leaveTime, setLeaveTime] = React.useState(2100);
  const [attractionOptions, setAttractionOptions] = React.useState("");
  const [warning, setWarning] = React.useState("");
  const [attractionDict, setAttractionDict] = React.useState({});
  // const [stopAttractionList, setStopAttractionList] = React.useState([]);
  const navigate = useNavigate();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;



  const toResults=()=>{
    if (park ==="") {
      setWarning("Must choose a park.")
    } else if (leaveTime <= entryTime) {
      setWarning("Leave time must be later than entry time.")
    } else if ( (moment(entryDate.$d).format("YYYY-MM-DD") === moment(today).format("YYYY-MM-DD")) &&  (entryTime <= currentTime) ) {
      setWarning("Entry time must be later than current time.")
    } else if (attractionOptions.length === 0) {
      setWarning("Must choose atleast one attraction.")
    } else {
      navigate('/results-en',{state:{attractionOptions: attractionOptions, entryTime: entryTime, leaveTime: leaveTime,
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
            options={["Tokyo Disneyland 🏰", "Tokyo DisneySea 🌏"]}
            label="Park"
            onChange={(event, newPark) => {
              setPark(newPark);
            }}
            renderInput={(params) => <TextField {...params} label="Park" placeholder='Choose a park'/>}
          />

          {/* Entry Date */}
          <DatePicker
            label="Entry Date"
            value={entryDate}
            minDate={today}
            maxDate={new Date(today.getTime()+60*60*24*30*1000)}
            inputFormat="YYYY-MM-DD"
            onChange={(newDate) => {
              setEntryDate(newDate);

              if (park === "Tokyo Disneyland 🏰") {
                let stopAttractionList = ""
                axios.get(`https://tdrscheduler.herokuapp.com/landStopEN/${moment(entryDate.$d).format("YYYY-MM-DD")}`).then((response) => {

                  stopAttractionList = response.data[0]
                  console.log(stopAttractionList)

                  for (let i=0; i < stopAttractionList.length; i++) {
                    delete landAttractionDictEN[stopAttractionList[i]];
                  }
  
                  setAttractionDict(landAttractionDictEN)
                
                });


              } else {
                let stopAttractionList = ""
                axios.get(`https://tdrscheduler.herokuapp.com/seaStopEN/${moment(entryDate.$d).format("YYYY-MM-DD")}`).then((response) => {
                  
                stopAttractionList = response.data[0]
                  console.log(stopAttractionList)

                  for (let i=0; i < stopAttractionList.length; i++) {
                    delete seaAttractionDictEN[stopAttractionList[i]];
                  }
  
                  setAttractionDict(seaAttractionDictEN)
                
                });

              };
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
            renderInput={(params) => <TextField {...params} label="Entry Time" placeholder='Entry Time'/>}
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
            renderInput={(params) => <TextField {...params} label="Leave Time" placeholder='Leave Time'/>}
          />

          {/* Select possible attractions */}
          <Autocomplete
            multiple
            size="small"
            options={Object.keys(attractionDict)}
            disableCloseOnSelect
            onChange={(event, newOptions) => {
              setAttractionOptions(newOptions);
            }}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Attractions to consider" placeholder="Choose attractions" />
            )}
          />


          {/* Warning Field and Submit Button */}
          <Typography color="error" variant="body2">{warning}</Typography>
          <Button variant="contained" endIcon={<AutoAwesomeIcon />}
            onClick={()=>{toResults()}}>Enter</Button>
        </Stack>
      </LocalizationProvider>
    </div>

  );
}
