import React, { Component } from "react";
import Controller from "./components/Controller.jsx";
import TimeSeriesGraphWrapper from "./components/TimeSeriesGraphWrapper.jsx";
import './MainPanel.css';
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import { TimeSeriesCollection } from "/imports/api/TimeSeriesCollection";
import { withTracker } from "meteor/react-meteor-data";
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
      rm0Temp: 20,
      rm0IsActivated: false,
      rm1Temp: 20,
      rm1IsActivated: false,
      rm2Temp: 20,
      rm2IsActivated: false,
      rm3Temp: 20,
      rm3IsActivated: false,
      rm4Temp: 20,
      rm4IsActivated: false,
      rm5Temp: 20,
      rm5IsActivated: false,
      rm6Temp: 20,
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

  handleClick = () => {
    console.log("clicked!");
  }

  getNewColor = (newAvgTemp) => {
    let intensity = (newAvgTemp - Constants.minTemp) / (Constants.maxTemp - Constants.minTemp);
    return `rgba(0,66,129,${0.5+intensity/2})`;
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
            <TimeSeriesGraphWrapper
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              size={this.state.size}
            />
          </div>
          <div className="footer">
            <Button style={{backgroundColor: this.getNewColor(28)}} onClick={() => this.setState({rm0IsActivated: !this.state.rm0IsActivated})}>Room 0</Button>
            <Button style={{backgroundColor: this.getNewColor(22)}} onClick={() => this.setState({rm1IsActivated: !this.state.rm1IsActivated})}>Room 1</Button>
            <Button style={{backgroundColor: this.getNewColor(20)}} onClick={() => this.setState({rm2IsActivated: !this.state.rm2IsActivated})}>Room 2</Button>
            <Button style={{backgroundColor: this.getNewColor(17)}} onClick={() => this.setState({rm3IsActivated: !this.state.rm3IsActivated})}>Room 3</Button>
            <Button style={{backgroundColor: this.getNewColor(15)}} onClick={() => this.setState({rm4IsActivated: !this.state.rm4IsActivated})}>Room 4</Button>
            <Button style={{backgroundColor: this.getNewColor(12)}} onClick={() => this.setState({rm5IsActivated: !this.state.rm5IsActivated})}>Room 5</Button>
            <Button style={{backgroundColor: this.getNewColor(7)}} onClick={() => this.setState({rm6IsActivated: !this.state.rm6IsActivated})}>Room 6</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPanel;
