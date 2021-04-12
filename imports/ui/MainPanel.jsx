import React, { Component } from "react";
import Controller from "./components/Controller.jsx";
import TimeSeriesGraphView from "./components/TimeSeriesGraphView.jsx"
import './MainPanel.css';
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

class MainPanel extends Component {
  constructor(props) {
    super(props);
    let now = new Date();
    let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
    let end = moment(start).add(1, "days").subtract(1, "seconds");
    this.state = {
      startDate: start,
      endDate: end,
      size: 7,
    };
  }

  onDateChange = (newStartDate, newEndDate) => {
    this.setState({
      startDate: newStartDate,
      endDate: newEndDate
    })
  }

  onSizeChange = (event, newValue) => {
    this.setState({ size: newValue });
  };

  render() {
    return (
      <div class="body">
        <div class="header">
          <Controller
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            size={this.state.size}
            onDateChange={this.onDateChange}
            onSizeChange={this.onSizeChange}
          />
        </div>
        <div class="main-content">
          Main content
          <TimeSeriesGraphView />
        </div>
        <div class="footer">Image</div>
      </div>
    );
  }
}

export default MainPanel;
