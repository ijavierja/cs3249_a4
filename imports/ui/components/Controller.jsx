import React, { Component, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import {FormControl} from 'react-bootstrap'
import Slider from "@material-ui/core/Slider";
import moment from "moment";

const marks = [
  {value: 1, label: '1'},
  {value: 2, label: '2'},
  {value: 3, label: '3'},
  {value: 4, label: '4'},
  {value: 5, label: '5'},
  {value: 6, label: '6'},
  {value: 7, label: '7'},
  {value: 8, label: '8'},
  {value: 9, label: '9'},
  {value: 10, label: '10'},
];

class Controller extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let start = this.props.startDate;
    let end = this.props.endDate;
    let ranges = {
      "Today Only": [moment(start), moment(end)],
      "Yesterday Only": [moment(start).subtract(1, "days"), moment(end).subtract(1, "days")],
      "3 Days": [moment(start).subtract(3, "days"), moment(end)],
      "Assignment 4": [moment(this.props.minDate), moment(this.props.maxDate)]
    }
    let local = {
      "format":"DD-MM-YYYY HH:mm",
      "sundayFirst" : false
    }
    return(
      <div>
        <DateTimeRangeContainer 
          ranges={ranges}
          start={this.props.startDate}
          end={this.props.endDate}
          local={local}
          applyCallback={this.props.onDateChange}
        >    
        <FormControl
          type="text"
          label="Text"
          placeholder="Set datetime (note: invalid datetimes will automatically be adjusted into valid datetimes)"
        /> 
        </DateTimeRangeContainer>
        <p>Start: {this.props.startDate.toString()}</p>
        <p>End: {this.props.endDate.toString()}</p>
        <Slider
            step={1}
            min={1}
            max={10}
            value={this.props.size}
            marks={marks}
            onChange={this.props.onSizeChange}
            valueLabelDisplay="on"
          />
        <span>
          2^{this.props.size} = {Math.pow(2, this.props.size)} samples
        </span>
      </div>
    );
  }
}

export default Controller;
