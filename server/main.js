import { Meteor } from 'meteor/meteor';
import { TimeSeriesCollection } from "/imports/db/TimeSeriesCollection";
import "/imports/api/TimeSeriesPublication";
import Papa from 'papaparse';

Meteor.startup(() => {
  if (TimeSeriesCollection.find().count() === 0) {
    console.log("loading from csv...");
    var parsed = Papa.parse(Assets.getText("room-temperatures.csv"), { header: true });
   
    for (var i = 0; i < parsed.data.length; i++) {
      console.log(parsed.data[i]);
      TimeSeriesCollection.insert(parsed.data[i]);
    }
    
  }
});
