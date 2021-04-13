import { Meteor } from 'meteor/meteor';
import { TimeSeriesCollection } from "/imports/api/TimeSeriesCollection";
import Papa from 'papaparse';

Meteor.startup(() => {
  if (TimeSeriesCollection.find().count() === 0) {
    console.log("starting");
    var parsed = Papa.parse(Assets.getText("room-temperatures.csv"), { header: true });
    for (var i = 0; i < parsed.data.length - 1; i++) {
      console.log("loading");
      
      TimeSeriesCollection.insert(parsed.data[i]);
      
    }
  }
});
