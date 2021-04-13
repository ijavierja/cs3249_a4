import React, { Component } from "react";
import Controller from "./components/Controller.jsx";
import TimeSeriesGraphWrapper from "./components/TimeSeriesGraphWrapper.jsx";
import './MainPanel.css';
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import { TimeSeriesCollection } from "/imports/api/TimeSeriesCollection";
import { withTracker } from "meteor/react-meteor-data";
import Room from "./components/Room.jsx";
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
      rooms: {
        room0: new Room(0),
        room1: new Room(1),
        room2: new Room(2),
        room3: new Room(3),
        room4: new Room(4),
        room5: new Room(5),
        room6: new Room(6),
      },
      temp0: 20,
      temp1: 20,
      temp2: 20,
      temp3: 20,
      temp4: 20,
      temp5: 20,
      temp6:20,
      tempMax: 28.06,
      tempMin: 7.983,
      color0: 'rgba(88,117,153,1)',
      color1: 'rgba(88,117,153,0.9)',
      color2: 'rgba(88,117,153,0.8)',
      color3: 'rgba(88,117,153,0.7)',
      color4: 'rgba(88,117,153,0.6)',
      color5: 'rgba(88,117,153,0.5)',
      color6: 'rgba(88,117,153,0.4)',
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
    /*     .forEach((datapoint) => {
        console.log(datapoint);
        switch (datapoint.RoomId) {
          case "6": {
            rm6Data.push({
              timestamp: datapoint.timestamp,
              temperature: datapoint.temperature,
            });
            break;
          }
          case "5": {
            rm5Data.push({
              timestamp: datapoint.timestamp,
              temperature: datapoint.temperature,
            });
            break;
          }
          case "4": {
            rm4Data.push({
              timestamp: datapoint.timestamp,
              temperature: datapoint.temperature,
            });
            break;
          }
          case "3": {
            rm3Data.push({
              timestamp: datapoint.timestamp,
              temperature: datapoint.temperature,
            });
            break;
          }
          case "2": {
            rm2Data.push({
              timestamp: datapoint.timestamp,
              temperature: datapoint.temperature,
            });
            break;
          }
          case "1": {
            rm1Data.push({
              timestamp: datapoint.timestamp,
              temperature: datapoint.temperature,
            });
            break;
          }
          case "0": {
            rm0Data.push({
              timestamp: datapoint.timestamp,
              temperature: datapoint.temperature,
            });
            break;
          }
        }
      });
    this.setState({
      rm6Data: {rm6Data},
      rm5Data: {rm5Data},
      rm4Data: {rm4Data},
      rm3Data: {rm3Data},
      rm2Data: {rm2Data},
      rm1Data: {rm1Data},
      rm0Data: {rm0Data}
      });*/
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
        <div class="footer">Image</div>
        <button onClick={this.fetchData}>update data</button>
        <div class="footer">
          <Button style={{backgroundColor: this.state.color0}}>Room 0</Button>
          <Button style={{backgroundColor: this.state.color1}}>R1</Button>
          <Button style={{backgroundColor: this.state.color2}}>R2</Button>
          <Button style={{backgroundColor: this.state.color3}}>R3</Button>
          <Button style={{backgroundColor: this.state.color4}}>R4</Button>
          <Button style={{backgroundColor: this.state.color5}}>R5</Button>
          <Button style={{backgroundColor: this.state.color6}}>R6</Button>
        </div>
      </div>
    );
  }
}

export default MainPanel;
