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
      rm6Data: [],
      rm5Data: [],
      rm4Data: [],
      rm3Data: [],
      rm2Data: [],
      rm1Data: [],
      rm0Data: [],
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

  //fetch data
  fetchData = (start, end, size) => {
     Meteor.subscribe("timeseries");
    var rm6Data = [];
    var rm5Data = [];
    var rm4Data = [];
    var rm3Data = [];
    var rm2Data = [];
    var rm1Data = [];
    var rm0Data = [];
    console.log("loading");
    var data = TimeSeriesCollection.find({
      //sort: { timestamp: 1 },
      timestamp: {
        $in: this.chooseTime(
          moment("2013-10-02T05:00:00"),
          moment("2013-10-10T05:00:00"),
          100 //size
        ),
      },
    }).fetch();

    this.setState({
      data: data
    });

    console.log("done");
  };

  chooseTime = (start, end, size) => {
    var duration = moment.duration(end.diff(start)).asMinutes() / (size - 1);

    var momentArray = [];
    momentArray.push(start.format("YYYY-MM-DD[T]HH:mm:00"));

    var currMoment = start.clone();

    for (var i = 0; i < size - 2; i++) {
      currMoment = currMoment.clone().add(duration, "minutes");
      
      momentArray.push(
        this.roundToFifteen(currMoment.clone()).format("YYYY-MM-DD[T]HH:mm:00")
      );
    }
    momentArray.push(end.format("YYYY-MM-DD[T]HH:mm:00"));
    return momentArray;
  };

  //sets moment to floor of fifteen minutes
  roundToFifteen = (currMoment) => {
    return currMoment.set("minute", Math.floor(currMoment.minute() / 15) * 15);
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
          <h3>No. of data: {this.state.data.length}</h3>
          <TimeSeriesGraphWrapper />
        </div>
        <button onClick={this.fetchData}>update data</button>
        <div class="footer">
          <Button style={{backgroundColor: this.getNewColor(28)}} onClick={() => this.setState({rm0IsActivated: !this.state.rm0IsActivated})}>Room 0</Button>
          <Button style={{backgroundColor: this.getNewColor(22)}} onClick={() => this.setState({rm1IsActivated: !this.state.rm1IsActivated})}>Room 1</Button>
          <Button style={{backgroundColor: this.getNewColor(20)}} onClick={() => this.setState({rm2IsActivated: !this.state.rm2IsActivated})}>Room 2</Button>
          <Button style={{backgroundColor: this.getNewColor(17)}} onClick={() => this.setState({rm3IsActivated: !this.state.rm3IsActivated})}>Room 3</Button>
          <Button style={{backgroundColor: this.getNewColor(15)}} onClick={() => this.setState({rm4IsActivated: !this.state.rm4IsActivated})}>Room 4</Button>
          <Button style={{backgroundColor: this.getNewColor(12)}} onClick={() => this.setState({rm5IsActivated: !this.state.rm5IsActivated})}>Room 5</Button>
          <Button style={{backgroundColor: this.getNewColor(7)}} onClick={() => this.setState({rm6IsActivated: !this.state.rm6IsActivated})}>Room 6</Button>
          <p>room0: {this.state.rm0IsActivated.toString()}</p>
        </div>
      </div>
    );
  }
}

export default MainPanel;
