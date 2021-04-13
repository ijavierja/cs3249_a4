import { Meteor } from 'meteor/meteor';
import { TimeSeriesCollection } from "/imports/api/TimeSeriesCollection";

const insertTask = (taskText) =>
  TimeSeriesCollection.insert({ text: taskText });

Meteor.startup(() => {
  if (TimeSeriesCollection.find().count() === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach(insertTask);
  }
});
