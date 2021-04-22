import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TimeSeriesCollection } from "/imports/db/TimeSeriesCollection";
import * as Constants from "./util/Constants.jsx";
import moment from "moment";
import Controller from "./components/Controller.jsx";
import { TimeSeriesGraph } from "./components/TimeSeriesGraph";
import FloorPlanView from "./components/FloorPlanView.jsx";
import BarLoader from 'react-bar-loader';
  
export const App = () => {
  const [{ startDate, endDate }, setDate] = useState({
    startDate: Constants.minDate,
    endDate: Constants.maxDate,
  });
  const [size, setSize] = useState(2);
  const [visibility, setVisibility] = useState({
    rm0: true,
    rm1: true,
    rm2: true,
    rm3: true,
    rm4: true,
    rm5: true,
    rm6: true,
  });
  const data = useData(startDate, endDate, Math.pow(2, size));

  //average temperature
  const rm0temp = getAverageTemp(data.rm0temp);
  const rm1temp = getAverageTemp(data.rm1temp);
  const rm2temp = getAverageTemp(data.rm2temp);
  const rm3temp = getAverageTemp(data.rm3temp);
  const rm4temp = getAverageTemp(data.rm4temp);
  const rm5temp = getAverageTemp(data.rm5temp);
  const rm6temp = getAverageTemp(data.rm6temp);

  onDateChange = (newStartDate, newEndDate) => {
    if (!data.isLoading) {
      // start date
      if (newStartDate < Constants.minDate) {
        newStartDate = Constants.minDate;
      } else {
        newStartDate.set(
          "minute",
          Math.floor(newStartDate.minute() / 15) * 15
        );
      }
      // end date
      if (newEndDate > Constants.maxDate) {
        newEndDate = Constants.maxDate;
      } else {
        newEndDate.set("minute", Math.floor(newStartDate.minute() / 15) * 15);
      }
      setDate({
        startDate: newStartDate,
        endDate: newEndDate,
      });
    }
  };

  onSizeChange = (event, newValue) => {
    if (!data.isLoading) {
      setSize(newValue);
    }
  };

  toggleRoom0 = () => {
    if (!data.isLoading) {
      setVisibility({ ...visibility, rm0: !visibility.rm0 });
    }
  };
  toggleRoom1 = () => {
    if (!data.isLoading) {
      setVisibility({ ...visibility, rm1: !visibility.rm1 });
    }
  };
  toggleRoom2 = () => {
    if (!data.isLoading) {
      setVisibility({ ...visibility, rm2: !visibility.rm2 });
    }
  };
  toggleRoom3 = () => {
    if (!data.isLoading) {
      setVisibility({ ...visibility, rm3: !visibility.rm3 });
    }
  };
  toggleRoom4 = () => {
    if (!data.isLoading) {
      setVisibility({ ...visibility, rm4: !visibility.rm4 });
    }
  };
  toggleRoom5 = () => {
    if (!data.isLoading) {
      setVisibility({ ...visibility, rm5: !visibility.rm5 });
    }
  };
  toggleRoom6 = () => {
    if (!data.isLoading) {
      setVisibility({ ...visibility, rm6: !visibility.rm6 });
    }
  };
  
  return (
    <div style={{
      margin: "0",
      padding: "0",
      width: "100%"
    }}>
      <div style={{
        textAlign: "center",
        width: "1000px",
        height: "100%",
        display: "block",
        paddingTop: "1%",
        paddingBottom: "1%",
        marginLeft: "auto",
        marginRight: "auto",
      }}>
        <p style={{
          fontSize: "28px",
          fontWeight: "600"
        }}>
          Room Temperature Monitoring Dashboard
        </p>
        <div style={{
          boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
          paddingTop: "0.1%",
          paddingBottom: "3%"
        }}>
          <p style={{
            fontSize: "25px",
            fontWeight: "500",
            textAlign: "left",
            marginLeft: "2%"
          }}>Settings
          </p>
          <Controller
            startDate={startDate}
            endDate={endDate}
            size={size}
            onDateChange={onDateChange}
            onSizeChange={onSizeChange}
          />
        </div>
        <div style={{
          boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
          marginTop: "2%",
          marginBottom: "2%",
          paddingTop: "0.1%",
          paddingBottom: "0.1%"
        }}>
          <p style={{
            fontSize: "25px",
            fontWeight: "500",
            textAlign: "left",
            marginLeft: "2%"
          }}>
            Graph
          </p>
          <div style={{display: "block", width: "90%", marginLeft: "auto", marginRight: "auto",}}>
            <BarLoader color={data.isLoading ? Constants.themeColor : "#fff"} height="2"/>
          </div>
          <TimeSeriesGraph
            timestamps={data.timestamps}
            rm5Timestamps={data.rm5Timestamps}
            rm0temp={data.rm0temp}
            rm1temp={data.rm1temp}
            rm2temp={data.rm2temp}
            rm3temp={data.rm3temp}
            rm4temp={data.rm4temp}
            rm5temp={data.rm5temp}
            rm6temp={data.rm6temp}
            visibility={visibility}
          />
        </div>
        <div style={{
          boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
          paddingTop: "0.1%",
          paddingBottom: "3%"
        }}>
          <p style={{
            fontSize: "25px",
            fontWeight: "500",
            textAlign: "left",
            marginLeft: "2%"
          }}>Floorplan
          <div style={{display: "block", width: "90%", marginLeft: "auto", marginRight: "auto", paddingTop: "1%"}}>
            <BarLoader color={data.isLoading ? Constants.themeColor : "#fff"} height="2"/>
          </div>
          </p>
          <FloorPlanView
            toggleRoom0={toggleRoom0}
            toggleRoom1={toggleRoom1}
            toggleRoom2={toggleRoom2}
            toggleRoom3={toggleRoom3}
            toggleRoom4={toggleRoom4}
            toggleRoom5={toggleRoom5}
            toggleRoom6={toggleRoom6}
            rm0temp={rm0temp}
            rm1temp={rm1temp}
            rm2temp={rm2temp}
            rm3temp={rm3temp}
            rm4temp={rm4temp}
            rm5temp={rm5temp}
            rm6temp={rm6temp}
            visibility={visibility}
          />
        </div>
      </div>
    </div>
  );
};

const useData = (
  start,
  end,
  size,
) =>
  useTracker(() => {
    const noDataAvailable = {
      timestamps: [],
      rm5Timestamps: [],
      rm0temp: [],
      rm1temp: [],
      rm2temp: [],
      rm3temp: [],
      rm4temp: [],
      rm5temp: [],
      rm6temp: [],
    };
    const handler = Meteor.subscribe("timeseries");

    if (!handler.ready()) {
      console.log("loading");
      return { ...noDataAvailable, isLoading: true };
    }
    if(handler.ready()) {
      console.log("done!");
    }
    const { timestamps, rm5Timestamps, keys } = createKeysTS(start, end, size);
    
    var rm0temp = [];
    var rm1temp = [];
    var rm2temp = [];
    var rm3temp = [];
    var rm4temp = [];
    var rm5temp = [];
    var rm6temp = [];
    
    TimeSeriesCollection.find({_id: {$in: keys}},{}).forEach((datapoint) => {
      switch (datapoint.RoomId) {
        case "0":
          rm0temp.push(datapoint.temperature);
          break;

        case "1":
          rm1temp.push(datapoint.temperature);
          break;

        case "2":
          rm2temp.push(datapoint.temperature);
          break;

        case "3":
          rm3temp.push(datapoint.temperature);
          break;

        case "4":
          rm4temp.push(datapoint.temperature);
          break;

        case "5":
          rm5temp.push(datapoint.temperature);
          break;

        case "6":
          rm6temp.push(datapoint.temperature);
          break;
      }
    });

    return {
      timestamps: timestamps,
      rm5Timestamps: rm5Timestamps,
      rm0temp: rm0temp,
      rm1temp: rm1temp,
      rm2temp: rm2temp,
      rm3temp: rm3temp,
      rm4temp: rm4temp,
      rm5temp: rm5temp,
      rm6temp: rm6temp,
      isLoading: false
    };
  });

function createKeysTS (start, end, size) {
  var timestamps = [];
  var rm5Timestamps = [];
  var keys = [];

  const duration = moment.duration(end.diff(start)).asMinutes() / (size - 1);
  
  var currDate = start.clone();
  let currTs;
  let currTs5;
   for (var i = 0; i < size; i++) {
     currTs = roundTo15(currDate.clone()).format("YYYY-MM-DDTHH:mm:00");
     if (i === 0) {
       currTs5 = roundUpTo30(currDate.clone()).format("YYYY-MM-DDTHH:mm:00");
     } else {
       currTs5 = roundDownTo30(currDate.clone()).format("YYYY-MM-DDTHH:mm:00");
     }
     for (var room = 0; room <= 6; room++) {
       if (room === 5) {
         keys.push(room.toString().concat(currTs5));
       } else {
         keys.push(room.toString().concat(currTs));
       }
     }
     timestamps.push(currTs);
     rm5Timestamps.push(currTs5);
     currDate = currDate.clone().add(duration, "minutes");
   }
  
  return {
    timestamps: timestamps,
    rm5Timestamps: rm5Timestamps,
    keys: keys,
  };
}

function roundTo15(date) {
  return date.set("minute", Math.floor(date.minute() / 15) * 15);
}

function roundUpTo30(date) {
  var minute = date.minute;

  if (minute > 30) {
    return date.set("minute", 0).set("hour", first.get("hour") + 1);
    
  } else  {
    return date.set("minute", 30);
  }
}

function roundDownTo30(date) {
  var minute = date.minute;

  if (minute < 30) {
    return date.set("minute", 30);
   
  } else {
    return date.set("minute", 0);
  }
}
function getAverageTemp(arr) {
  if (arr.length === 0) {
    return Constants.minTemp + Constants.maxTemp;
  }
  var sum = 0;
  for(var i=0; i < arr.length; i++) {
    sum += parseFloat(arr[i]);
  }

  return sum/arr.length;
}
