import React, { useState } from 'react';
//import MainPanel from "./MainPanel.jsx"
import { useTracker } from 'meteor/react-meteor-data';
import { TimeSeriesCollection } from "/imports/db/TimeSeriesCollection";
import { TimeSeriesGraph } from "./components/TimeSeriesGraph";
import * as Constants from "./util/Constants.jsx";
import moment from "moment";
  
export const App = () => {
  const [{ startDate, endDate }, setDate] = useState({
    startDate: Constants.minDate,
    endDate: Constants.maxDate,
  });
  const [size, setSize] = useState(20);

  const timestamps = getTimestamps(startDate, endDate, size);
  const rm5Timestamps = roundTo30(timestamps);

  const data = useData(
    timestamps,
    rm5Timestamps,
  );

  
  return (
    <div>
      <div>start date: {startDate.format("YYYY-MM-DDTHH:mm:00")}</div>
      <div>end date: {endDate.format("YYYY-MM-DDTHH:mm:00")}</div>
      <div>size: {size}</div>
      <button onClick={() => setSize((size) => size +1)}>
        Increase array size
      </button>

      <div>
        <TimeSeriesGraph
          timestamps={timestamps}
          rm5Timestamps={rm5Timestamps}
          rm0temp={data.rm0temp}
          rm1temp={data.rm1temp}
          rm2temp={data.rm2temp}
          rm3temp={data.rm3temp}
          rm4temp={data.rm4temp}
          rm5temp={data.rm5temp}
          rm6temp={data.rm6temp}
        />
      </div>
      <div>
        rm0temp:
        {data.rm0temp.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </div>
      <div>
        rm1temp:
        {data.rm1temp.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </div>
      <div>
        rm2temp:
        {data.rm2temp.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </div>
      <div>
        rm3temp:
        {data.rm3temp.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </div>
      <div>
        rm4temp:
        {data.rm4temp.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </div>
      <div>
        rm5temp:
        {data.rm5temp.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </div>
      <div>
        rm6temp:
        {data.rm6temp.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </div>
      <div>
        timestamps:
        {timestamps.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </div>
      <div>
        edited timestamps:
        {rm5Timestamps.map((d) => (
          <li>{d}</li>
        ))}
      </div>
    </div>
  );
};

const useData = (
  timestamps,
  rm5Timestamps,
) =>
  useTracker(() => {
    const noDataAvailable = {
      rm0temp: [],
      rm1temp: [],
      rm2temp: [],
      rm3temp: [],
      rm4temp: [],
      rm5temp: [],
      rm6temp: [],
    };
    Meteor.subscribe("timeseries");

    //const handler = Meteor.subscribe("timeseries");

    /*if (!handler.ready()) {
      console.log("loading");
      return { ...noDataAvailable, isLoading: true };
    }*/
    var rm0temp = [];
    var rm1temp = [];
    var rm2temp = [];
    var rm3temp = [];
    var rm4temp = [];
    var rm5temp = [];
    var rm6temp = [];

    TimeSeriesCollection.find({},{sort: {timestamp: 1}}).forEach((datapoint) => {
      switch (datapoint.RoomId) {
        case "0":
          if (timestamps.includes(datapoint.timestamp)) {
            rm0temp.push(datapoint.temperature);
          }
          break;

        case "1":
          if (timestamps.includes(datapoint.timestamp)) {
            rm1temp.push(datapoint.temperature);
          }
          break;

        case "2":
          if (timestamps.includes(datapoint.timestamp)) {
            rm2temp.push(datapoint.temperature);
          }
          break;

        case "3":
          if (timestamps.includes(datapoint.timestamp)) {
            rm3temp.push(datapoint.temperature);
          }
          break;

        case "4":
          if (timestamps.includes(datapoint.timestamp)) {
            rm4temp.push(datapoint.temperature);
          }
          break;

        case "5":
          if (rm5Timestamps.includes(datapoint.timestamp)) {
            rm5temp.push(datapoint.temperature);
          }
          break;

        case "6":
          if (timestamps.includes(datapoint.timestamp)) {
            rm6temp.push(datapoint.temperature);
          }
          break;
      }
    });

    return {
      rm0temp: rm0temp,
      rm1temp: rm1temp,
      rm2temp: rm2temp,
      rm3temp: rm3temp,
      rm4temp: rm4temp,
      rm5temp: rm5temp,
      rm6temp: rm6temp,
    };
  });

function getTimestamps(start, end, size){
  var timestamps = [];
  const duration = moment.duration(end.diff(start)).asMinutes() / (size - 1);
  var currDate = start.clone();

  timestamps.push(start.format("YYYY-MM-DDTHH:mm:00"));

  for (var i = 0; i < size -2; i++) {
    currDate = currDate.clone().add(duration, "minutes");
    currDate = roundTo15(currDate.clone());
    timestamps.push(currDate.format("YYYY-MM-DDTHH:mm:00"));
  }
  timestamps.push(end.format("YYYY-MM-DDTHH:mm:00"));
  return timestamps;
}

function roundTo15(date){
  return date.set("minute", Math.floor(date.minute() / 15) * 15);
}

function roundTo30(arr) {
  var timestamps = [];

  const first = moment(arr[0]);
  const firstMinute = first.minute();
  if (firstMinute === 0 || firstMinute === 30) {
    timestamps.push(arr[0]);
  }
  else {
    if (firstMinute < 30) {
      timestamps.push(
        first.set("minute", 30).format("YYYY-MM-DDTHH:mm:00")
      );
    }
    else if (firstMinute > 30) {
      timestamps.push(
        first
          .set("minute", 0)
          .set("hour", first.get("hour") + 1)
          .format("YYYY-MM-DDTHH:mm:00")
      );
    }
  }

  var currDate;
  var minute;
  for (var i = 1; i < arr.length; i++ ) {
    currDate = moment(arr[i]);
    minute = currDate.minute();
    if (minute === 0 || minute === 30) {
      timestamps.push(arr[i]);
    } else {
      if (minute < 30) {
        timestamps.push(
          currDate.set("minute", 0).format("YYYY-MM-DDTHH:mm:00")
        );
      } else if (minute > 30) {
        timestamps.push(
          currDate.set("minute", 30).format("YYYY-MM-DDTHH:mm:00")
        );
      }
    }
  }

  return timestamps;
}
