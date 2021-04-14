import React, { Component } from "react";

export default class TimeSeriesGraphView extends Component {
  state = {};

  relevantData(RoomId) {
    return this.props.data.filter(datapoint => datapoint.RoomId = RoomId);
  }

  render() {
    return (
      <div>
        TimeSeriesGraphView
        <h3>{this.props.data.length}</h3>
        <div>
          {/* {this.relevantData(5).map(timeseries => <p>Time: {timeseries.timestamp}, roomid: {timeseries.RoomId}</p>)} */}
        </div>
      </div>
    );
  }
}
