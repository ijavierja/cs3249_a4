import React, { Component } from "react";

export default class TimeSeriesGraphView extends Component {
  state = {};

  render() {
    return (
      <div>
        TimeSeriesGraphView
        <h3>{this.props.data.length}</h3>
      </div>
    );
  }
}
