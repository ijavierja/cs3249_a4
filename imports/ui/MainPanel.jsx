import React, { Component } from "react";
import Controller from "./components/Controller.jsx";
import TimeSeriesGraphView from "./components/TimeSeriesGraphView.jsx";
import FloorPlanView from "./components/FloorPlanView.jsx";
import './MainPanel.css';
import "bootstrap/dist/css/bootstrap.min.css";
import * as Constants from "./util/Constants.jsx";

class MainPanel extends Component {
  constructor(props) {
    super(props);
    let start = Constants.minDate;
    let end = Constants.maxDate;
    this.state = {
      startDate: start,
      endDate: end,
      size: 7,
      data: [],
      rm0Temp: 28,
      rm0IsActivated: false,
      rm1Temp: 24,
      rm1IsActivated: false,
      rm2Temp: 20,
      rm2IsActivated: false,
      rm3Temp: 16,
      rm3IsActivated: false,
      rm4Temp: 15,
      rm4IsActivated: false,
      rm5Temp: 11,
      rm5IsActivated: false,
      rm6Temp: 7,
      rm6IsActivated: false,
    };
  }

  onDateChange = (newStartDate, newEndDate) => {
    // start date
    if (newStartDate < Constants.minDate) {
      this.setState({startDate: Constants.minDate})
    } else {
      this.setState({startDate: newStartDate.set('minute', Math.floor(newStartDate.minute()/15)*15)})
    }
    // end date
    if (newEndDate > Constants.maxDate) {
      this.setState({endDate: Constants.maxDate})
    } else {
      this.setState({endDate: newEndDate.set('minute', Math.floor(newEndDate.minute()/15)*15)})
    }
  }

  onSizeChange = (event, newValue) => {
    this.setState({ size: newValue });
  };

  toggleRoom0 = () => {
    this.setState({rm0IsActivated: !this.state.rm0IsActivated});
  }

  toggleRoom1 = () => {
    this.setState({rm1IsActivated: !this.state.rm1IsActivated});
  }

  toggleRoom2 = () => {
    this.setState({rm2IsActivated: !this.state.rm2IsActivated});
  }

  toggleRoom3 = () => {
    this.setState({rm3IsActivated: !this.state.rm3IsActivated});
  }

  toggleRoom4 = () => {
    this.setState({rm4IsActivated: !this.state.rm4IsActivated});
  }

  toggleRoom5 = () => {
    this.setState({rm5IsActivated: !this.state.rm5IsActivated});
  }

  toggleRoom6 = () => {
    this.setState({rm6IsActivated: !this.state.rm6IsActivated});
  }

  render() {
    return (
      <div className="body">
        <div className="container">
          <h3>Room Temperature Monitoring Dashboard</h3>
          <div className="controller">
            <Controller
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              size={this.state.size}
              onDateChange={this.onDateChange}
              onSizeChange={this.onSizeChange}
            />
          </div>
          <div className="main-content">
            <TimeSeriesGraphView
              rm0IsActivated={this.state.rm0IsActivated}
              rm1IsActivated={this.state.rm1IsActivated}
              rm2IsActivated={this.state.rm2IsActivated}
              rm3IsActivated={this.state.rm3IsActivated}
              rm4IsActivated={this.state.rm4IsActivated}
              rm5IsActivated={this.state.rm5IsActivated}
              rm6IsActivated={this.state.rm6IsActivated}
            />
          </div>
          <div className="footer">
            <FloorPlanView
              toggleRoom0={this.toggleRoom0}
              toggleRoom1={this.toggleRoom1}
              toggleRoom2={this.toggleRoom2}
              toggleRoom3={this.toggleRoom3}
              toggleRoom4={this.toggleRoom4}
              toggleRoom5={this.toggleRoom5}
              toggleRoom6={this.toggleRoom6}
              rm0Temp={this.state.rm0Temp}
              rm1Temp={this.state.rm1Temp}
              rm2Temp={this.state.rm2Temp}
              rm3Temp={this.state.rm3Temp}
              rm4Temp={this.state.rm4Temp}
              rm5Temp={this.state.rm5Temp}
              rm6Temp={this.state.rm6Temp}
              rm0IsActivated={this.state.rm0IsActivated}
              rm1IsActivated={this.state.rm1IsActivated}
              rm2IsActivated={this.state.rm2IsActivated}
              rm3IsActivated={this.state.rm3IsActivated}
              rm4IsActivated={this.state.rm4IsActivated}
              rm5IsActivated={this.state.rm5IsActivated}
              rm6IsActivated={this.state.rm6IsActivated}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainPanel;
