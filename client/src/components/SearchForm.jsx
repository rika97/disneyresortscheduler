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
import seaAttractionDict from './SeaAttractionDict';
import landAttractionDict from './LandAttractionDict';



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
      setWarning("パークを選択してください")
    } else if (leaveTime <= entryTime) {
      setWarning("退園時刻は入園時刻よりも後から指定してください")
    } else if ( (moment(entryDate.$d).format("YYYY-MM-DD") === moment(today).format("YYYY-MM-DD")) &&  (entryTime <= currentTime) ) {
      setWarning("入園時刻は現在時刻よりも後から指定してください")
    } else if (attractionOptions.length === 0) {
      setWarning("アトラクションは必ず一つ以上選択してください")
    } else {
      navigate('/results',{state:{attractionOptions: attractionOptions, entryTime: entryTime, leaveTime: leaveTime,
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
            label="来園日"
            value={entryDate}
            minDate={today}
            maxDate={new Date(today.getTime()+60*60*24*30*1000)}
            inputFormat="YYYY-MM-DD"
            onChange={(newDate) => {
              setEntryDate(newDate);

              if (park === "東京ディズニーランド 🏰") {
                let stopAttractionList = ""
                axios.get(`https://tdrscheduler.herokuapp.com/landStop/${moment(entryDate.$d).format("YYYY-MM-DD")}`).then((response) => {

                  stopAttractionList = response.data[0]
                  console.log(stopAttractionList)

                  for (let i=0; i < stopAttractionList.length; i++) {
                    delete landAttractionDict[stopAttractionList[i]];
                  }
  
                  setAttractionDict(landAttractionDict)
                
                });


              } else {
                let stopAttractionList = ""
                axios.get(`https://tdrscheduler.herokuapp.com/${moment(entryDate.$d).format("YYYY-MM-DD")}`).then((response) => {
                  
                stopAttractionList = response.data[0]
                  console.log(stopAttractionList)

                  for (let i=0; i < stopAttractionList.length; i++) {
                    delete seaAttractionDict[stopAttractionList[i]];
                  }
  
                  setAttractionDict(seaAttractionDict)
                
                });

              };
            }}
            renderInput={(params) => <TextField {...params} />}
          />

          {/* Entry Time */}
          <Autocomplete
            disablePortal
            options={timeOptions}
            label="来園時刻"
            onChange={(event, newEntryTime) => {
              setEntryTime(newEntryTime?.timeValue);
            }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="来園時刻" placeholder='来園時刻'/>}
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
              <TextField {...params} label="体験したいアトラクション" placeholder="アトラクションを選択" />
            )}
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
