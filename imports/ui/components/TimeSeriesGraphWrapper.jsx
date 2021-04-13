import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { TimeSeriesCollection } from "/imports/api/TimeSeriesCollection";
import TimeSeriesGraphView from "./TimeSeriesGraphView.jsx";

const TimeSeriesGraphWrapper = withTracker(({ start, end }) => {
  Meteor.subscribe("timeseries");
  return {
    tasks: TimeSeriesCollection.find(
      {},
      { skip: start, limit: end - start }
    ).fetch(),
  };
})(TimeSeriesGraphView);

export default TimeSeriesGraphWrapper;