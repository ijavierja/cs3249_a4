import { Meteor } from "meteor/meteor";
import { TimeSeriesCollection } from "/imports/db/TimeSeriesCollection";

Meteor.publish("timeseries", function publishTasks() {
  return TimeSeriesCollection.find({},{});
});
