import React, { useState } from "react";
import Plot from "react-plotly.js";
import moment from "moment";

export const TimeSeriesGraph = ({
  timestamps,
  rm5Timestamps,
  rm0temp,
  rm1temp,
  rm2temp,
  rm3temp,
  rm4temp,
  rm5temp,
  rm6temp,
}) => {
  var Room0 = {
    x: timestamps,
    y: rm0temp,
    type: "line",
    name: "Room 0",
  };

  var Room1 = {
    x: timestamps,
    y: rm1temp,
    type: "line",
    name: "Room 1",
  };

  var Room2 = {
    x: timestamps,
    y: rm2temp,
    type: "line",
    name: "Room 2",
  };

  var Room3 = {
    x: timestamps,
    y: rm3temp,
    type: "line",
    name: "Room 3",
  };

  var Room4 = {
    x: timestamps,
    y: rm4temp,
    type: "line",
    name: "Room 4",
  };

  var Room5 = {
    x: rm5Timestamps,
    y: rm5temp,
    type: "line",
    name: "Room 5",
  };

  var Room6 = {
    x: timestamps,
    y: rm6temp,
    type: "line",
    name: "Room 6",
  };

  return (
    <div>
      <Plot
        data={[Room0, Room1, Room2, Room3, Room4, Room5, Room6]}
        layout={{
          title: "Timeseries Graph",
        }}
      />
    </div>
  );
};