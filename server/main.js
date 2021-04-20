import { Meteor } from 'meteor/meteor';
import { TimeSeriesCollection } from "/imports/db/TimeSeriesCollection";
import "/imports/api/TimeSeriesPublication";
import Papa from 'papaparse';

Meteor.startup(() => {
  if (TimeSeriesCollection.find().count() === 0) {
    console.log("loading from csv...");
    var parsed = Papa.parse(Assets.getText("room-temperatures.csv"), { header: true });
    var id;
    var row;
    for (var i = 0; i < parsed.data.length; i++) {
      row = parsed.data[i];
      id = row.RoomId.concat(row.timestamp);
      TimeSeriesCollection.insert({_id: id, RoomId: row.RoomId, timestamp: row.timestamp, temperature: parsed.data[i].temperature});
    }
    TimeSeriesCollection.rawCollection().createIndex({ _id: 1 });
  }
  
});
