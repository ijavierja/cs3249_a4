import React, { Component } from "react";
import Plot from 'react-plotly.js';
import moment from "moment";

let rm0Timestamp = ['2013-10-02T05:00:00', '2013-10-02T05:15:00', '2013-10-02T05:30:00', '2013-10-02T05:45:00', '2013-10-02T06:00:00'];
let rm0Temperature = [23.869, 25.125, 23.484, 22.525, 23.196];
let rm1Timestamp = ['2013-10-02T05:00:00', '2013-10-02T05:15:00', '2013-10-02T05:30:00', '2013-10-02T05:45:00', '2013-10-02T06:00:00'];
let rm1Temperature = [19.567, 19.567, 19.567, 19.567, 19.567];
let rm2Timestamp = ['2013-10-02T05:00:00', '2013-10-02T05:15:00', '2013-10-02T05:30:00', '2013-10-02T05:45:00', '2013-10-02T06:00:00'];
let rm2Temperature = [19.758, 19.662, 19.758, 19.662, 19.662];

var Room0 = {x: rm0Timestamp, y: rm0Temperature, type: 'line', name: 'Room 0'};
var Room1 = {x: rm1Timestamp, y: rm1Temperature, type: 'line', name: 'Room 1'};
var Room2 = {x: rm2Timestamp, y: rm2Temperature, type: 'line', name: 'Room 2'};

export default class TimeSeriesGraphView extends Component {
  render() {
    return (
      <div>
        <Plot
          data={[Room0, Room1, Room2]}
          layout={{
            title: 'Timeseries Graph',
          }}
        />
      </div>
    );
  }
}
