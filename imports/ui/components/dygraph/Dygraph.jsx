import React, { Component } from "react";
import Dygraph from "dygraphs";

class DyGraph extends Component {
  componentDidMount() {
    var data =
      "Date,Temperature\n" +
      "2008-05-07,75\n" +
      "2008-05-08,70\n" +
      "2008-05-09,80\n";
    
      const interactionModel = Object.assign(
      {},
      Dygraph.defaultInteractionModel,
      {
        mouseup: (event, g, context) => {
          if (context.isPanning == true) {
            onPanZoom(g.dateWindow_[0], g.dateWindow_[1]);
          }
          Dygraph.endPan(event, g, context);
          context.isPanning = false;
        },
      }
    );

    new Dygraph(this.refs.graph, data, {
    });
  }

  render() {
    return <div ref="graph"></div>;
  }
}

export default DyGraph;