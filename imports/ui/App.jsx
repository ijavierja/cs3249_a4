import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TimeSeriesCollection } from "/imports/db/TimeSeriesCollection";
import { TimeSeriesGraph } from "./components/TimeSeriesGraph";
import * as Constants from "./util/Constants.jsx";
import moment from "moment";
import { Controller } from './components/Controller';
  
export const App = () => {
  const [{ startDate, endDate }, setDate] = useState({
    startDate: Constants.minDate,
    endDate: Constants.maxDate,
  });
  const [size, setSize] = useState(3);
  const data = useData(startDate, endDate, size);
  
  return (
    <div>
      <div>start date: {startDate.format("YYYY-MM-DDTHH:mm:00")}</div>
      <div>end date: {endDate.format("YYYY-MM-DDTHH:mm:00")}</div>
      <div>size: {size}</div>
      <button onClick={() => setSize((size) => size + 1)}>
        Increase array size
      </button>

      <div>
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
        />
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
