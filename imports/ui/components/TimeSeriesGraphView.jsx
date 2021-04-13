import React, { Component } from "react";

export default class TimeSeriesGraphView extends Component {
  state = {};

  render() {
    return (
      <div>
        TimeSeriesGraphView
      </div>
    );
  }
}
/*
const Graph = ({ datapoint }) => {
  return (
    <li>
      {datapoint.RoomId} {datapoint.timestamp} {datapoint.temperature}
    </li>
  );
};
{
  this.props.data.map((datapoint) => <Graph datapoint={datapoint} />);
}
*/