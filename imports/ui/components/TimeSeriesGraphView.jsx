import React, { Component } from "react";
import Plot from 'react-plotly.js';
import moment from "moment";

let rm0Timestamp = ['2013-10-02T05:00:00', '2013-10-02T05:15:00', '2013-10-02T05:30:00', '2013-10-02T05:45:00', '2013-10-02T06:00:00'];
let rm0Temperature = [23.869, 25.125, 23.484, 22.525, 23.196];
let rm1Timestamp = ['2013-10-02T05:00:00', '2013-10-02T05:15:00', '2013-10-02T05:30:00', '2013-10-02T05:45:00', '2013-10-02T06:00:00'];
let rm1Temperature = [19.567, 19.567, 19.567, 19.567, 19.567];
let rm2Timestamp = ['2013-10-02T05:00:00', '2013-10-02T05:15:00', '2013-10-02T05:30:00', '2013-10-02T05:45:00', '2013-10-02T06:00:00'];
let rm2Temperature = [19.758, 19.662, 19.758, 19.662, 19.662];

var trace0 = {x: rm0Timestamp, y: rm0Temperature, type: 'line'};
var trace1 = {x: rm1Timestamp, y: rm1Temperature, type: 'line'};
var trace2 = {x: rm2Timestamp, y: rm2Temperature, type: 'line'};

var data = [trace0, trace1, trace2];

var layout = {
  width: 320,
  height: 240,
  title: 'A Fancy Plot',
}

export default class TimeSeriesGraphView extends Component {
  render() {
    return (
      <div>
        <Plot
          data={[trace0, trace1, trace2]}
          layout={{
            title: 'Timeseries Graph',
          }}
        />
        <h3>{this.props.data.length}</h3>
      </div>
    );
  }
}
