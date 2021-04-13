import React, { Component } from "react";
import Controller from "./components/Controller.jsx";
import TimeSeriesGraphWrapper from "./components/TimeSeriesGraphWrapper.jsx";
import './MainPanel.css';
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import { TimeSeriesCollection } from "/imports/api/TimeSeriesCollection";
import { withTracker } from "meteor/react-meteor-data";

class MainPanel extends Component {
  constructor(props) {
    super(props);
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    );
    let end = moment(start).add(1, "days").subtract(1, "seconds");
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
    };
  }

  onDateChange = (newStartDate, newEndDate) => {
    this.setState({
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };

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
          10
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
          {this.state.data.length}
          <TimeSeriesGraphWrapper />
        </div>
        <div class="footer">Image</div>
        <button onClick={this.handleClick}>Try!</button>
        <button onClick={this.fetchData}>+++</button>
      </div>
    );
  }
}

export default MainPanel;
