import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { TimeSeriesCollection } from "/imports/api/TimeSeriesCollection";
import TimeSeriesGraphView from "./TimeSeriesGraphView.jsx";
import React, { Component } from "react";

const TimeSeriesGraphWrapper = withTracker(() => {
  Meteor.subscribe("timeseries");
  return {
    data: TimeSeriesCollection.find({},{}).fetch(),
  };
})(TimeSeriesGraphView);

export default TimeSeriesGraphWrapper;
