import React, { Component } from "react";

export default class TimeSeriesGraphView extends Component {
  state = {};

  render() {
    return (
      <div>
        TimeSeriesGraphView
        {this.props.data.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
    );
  }
}

const Task = ({ task }) => {
  return <li>{task.text}</li>;
};
