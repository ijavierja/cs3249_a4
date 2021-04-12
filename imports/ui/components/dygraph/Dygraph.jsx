import React, { Component } from "react";
import Dygraph from "dygraphs";
import "dygraphs/dist/dygraph.min.css";

class DyGraph extends Component {
  componentDidMount() {
    var data =
      "Date,Temperature\n" +
      "2008-05-07,75\n" +
      "2008-05-08,70\n" +
      "2008-05-09,80\n";
      
    new DygraphBase(this.refs.chart, data, {});
  }

  render() {
    return <div ref="chart"></div>;
  }
}

export default DyGraph;