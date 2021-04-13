import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { TimeSeriesCollection } from "/imports/api/TimeSeriesCollection";
import TimeSeriesGraphView from "./TimeSeriesGraphView.jsx";
import Example from "./Example.jsx";
import React, { Component } from "react";

const TimeSeriesGraphWrapper = withTracker(({ start, end, foo }) => {
  Meteor.subscribe("timeseries");
  return {
    data: TimeSeriesCollection.find(
      {},
      { skip: start, limit: end - start }
    ).fetch(),
  };
})(TimeSeriesGraphView);

export default TimeSeriesGraphWrapper;
