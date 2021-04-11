import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import Slider from "@material-ui/core/Slider";

class Controller extends Component {
  debug = () => {
    console.log("DEBUG");
    console.log("DATE: " + this.props.startDate);
  };
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <span>Start: </span>
            <DatePicker
              onChange={this.props.onStartDateChange}
              selected={this.props.startDate}
            />
            <TimePicker
              onChange={this.props.onStartTimeChange}
              value={this.props.startTime}
            />
          </Col>
          <Col>
            <span>End: </span>
            <DatePicker
              onChange={this.props.onEndDateChange}
              value={this.props.endDate}
            />
            <TimePicker
              onChange={this.props.onEndTimeChange}
              value={this.props.endTime}
            />
          </Col>
          <Col>
            <Slider
              step={1}
              min={1}
              max={10}
              value={this.props.size}
              onChange={this.props.onSizeChange}
              valueLabelDisplay="on"
            />
            <span>
              2^{this.props.size} = {Math.pow(2, this.props.size)} samples
            </span>
          </Col>
        </Row>
        <Row>
          <Button onClick={this.debug}>DEBUG</Button>
        </Row>
      </Container>
    );
  }
}

export default Controller;
