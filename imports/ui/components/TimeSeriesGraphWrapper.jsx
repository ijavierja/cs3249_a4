import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { TimeSeriesCollection } from "/imports/api/TimeSeriesCollection";
import TimeSeriesGraphView from "./TimeSeriesGraphView.jsx";
import React, { Component } from "react";

const TimeSeriesGraphWrapper = withTracker((startDate, endDate, size) => {
  Meteor.subscribe("timeseries");
  return {
    data: TimeSeriesCollection.find({}).fetch(),
    startDate: startDate,
    endDate: endDate,
    size: size,
  };
})(TimeSeriesGraphView);

export default TimeSeriesGraphWrapper;
