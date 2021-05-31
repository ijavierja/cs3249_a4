import React, { useState } from "react";
import Plot from "react-plotly.js";

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
  rm0tempAvg,
  rm1tempAvg,
  rm2tempAvg,
  rm3tempAvg,
  rm4tempAvg,
  rm5tempAvg,
  rm6tempAvg,
  visibility,
}) => {

  var Room0 = {
    x: timestamps,
    y: rm0temp,
    type: "line",
    name: "Room 0:" + rm0tempAvg.toFixed(3) + "°C",
    visible: visibility.rm0 ? "true" : "legendonly",
  };

  var Room1 = {
    x: timestamps,
    y: rm1temp,
    type: "line",
    name: "Room 1:" + rm1tempAvg.toFixed(3) + "°C",
    visible: visibility.rm1 ? "true" : "legendonly",
  };

  var Room2 = {
    x: timestamps,
    y: rm2temp,
    type: "line",
    name: "Room 2:" + rm2tempAvg.toFixed(3) + "°C",
    visible: visibility.rm2 ? "true" : "legendonly",
  };

  var Room3 = {
    x: timestamps,
    y: rm3temp,
    type: "line",
    name: "Room 3:" + rm3tempAvg.toFixed(3) + "°C",
    visible: visibility.rm3 ? "true" : "legendonly",
  };

  var Room4 = {
    x: timestamps,
    y: rm4temp,
    type: "line",
    name: "Room 4:" + rm4tempAvg.toFixed(3) + "°C",
    visible: visibility.rm4 ? "true" : "legendonly",
  };

  var Room5 = {
    x: rm5Timestamps,
    y: rm5temp,
    type: "line",
    name: "Room 5:" + rm5tempAvg.toFixed(3) + "°C",
    visible: visibility.rm5 ? "true" : "legendonly",
  };

  var Room6 = {
    x: timestamps,
    y: rm6temp,
    type: "line",
    name: "Room 6:" + rm6tempAvg.toFixed(3) + "°C",
    visible: visibility.rm6 ? "true" : "legendonly",
  };

  return (
    <div>
      <Plot
        data={[Room0, Room1, Room2, Room3, Room4, Room5, Room6]}
        layout={{
          autosize: true,
          height: 600,
          width: 950
        }}
      />
    </div>
  );
};
