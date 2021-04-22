import React, { Component, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import {FormControl} from 'react-bootstrap'
import Slider from "@material-ui/core/Slider";
import moment from "moment";
import * as Constants from "../util/Constants.jsx";

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
      "Assignment 4": [moment(Constants.minDate), moment(Constants.maxDate)]
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
          <CalendarIcon/>
          <p><span>Start: </span> {this.props.startDate.format('YYYY-MM-DD HH:mm:ss')}</p>
          <p><span>End: </span> {this.props.endDate.format('YYYY-MM-DD HH:mm:ss')}</p>
        </DateTimeRangeContainer>
        <div style={{
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto"
        }}>
          <Slider
            step={1}
            min={1}
            max={10}
            value={this.props.size}
            marks={marks}
            onChange={this.props.onSizeChange}
          />
        </div>
        <span>Number of samples: </span>2^{this.props.size} = {Math.pow(2, this.props.size)}
      </div>
    );
  }
}

class CalendarIcon extends React.Component {
  render() {
    return (
      
      <svg xmlns="http://www.w3.org/2000/svg" width="49.931" height="52" viewBox="0 0 49.931 52">
        <g id="calendar" transform="translate(-5.951)" cursor="pointer">
          <path id="Path_2" d="M49.836,26.972H12a6.046,6.046,0,0,0-6.046,6.046V68.237A6.046,6.046,0,0,0,12,74.282h37.84a6.046,6.046,0,0,0,6.046-6.046V33.018a6.045,6.045,0,0,0-6.046-6.046Z" transform="translate(0 -22.282)" fill="#ebf0f3"/>
          <path id="Path_3" d="M55.882,28.773V21.448A6.046,6.046,0,0,0,49.836,15.4H12a6.046,6.046,0,0,0-6.046,6.046v7.325Z" transform="translate(0 -12.724)" fill="#3f51b5"/>
          <path id="Path_4" d="M55.882,39.7v-6.68a6.046,6.046,0,0,0-6.046-6.046H12a6.046,6.046,0,0,0-6.046,6.046V39.7Z" transform="translate(0 -22.282)" fill="#b0b6da"/>
          <path id="Path_5" d="M52.877,45.645a2.11,2.11,0,1,0,2.11,2.11A2.11,2.11,0,0,0,52.877,45.645Z" transform="translate(-37.024 -37.708)" fill="#3f51b5"/>
          <path id="Path_6" d="M57.539,0A1.129,1.129,0,0,0,56.41,1.129V9.924a1.129,1.129,0,1,0,2.258,0V1.129A1.129,1.129,0,0,0,57.539,0Z" transform="translate(-41.685)" fill="#4d5c7d"/>
          <path id="Path_7" d="M110.63,45.645a2.11,2.11,0,1,0,2.11,2.11A2.11,2.11,0,0,0,110.63,45.645Z" transform="translate(-84.735 -37.708)" fill="#3f51b5"/>
          <path id="Path_8" d="M115.292,0a1.129,1.129,0,0,0-1.129,1.129V9.924a1.129,1.129,0,1,0,2.258,0V1.129A1.129,1.129,0,0,0,115.292,0Z" transform="translate(-89.396)" fill="#4d5c7d"/>
          <path id="Path_9" d="M168.383,45.645a2.11,2.11,0,1,0,2.11,2.11A2.11,2.11,0,0,0,168.383,45.645Z" transform="translate(-132.446 -37.708)" fill="#3f51b5"/>
          <path id="Path_10" d="M173.045,0a1.129,1.129,0,0,0-1.129,1.129V9.924a1.129,1.129,0,0,0,2.258,0V1.129A1.129,1.129,0,0,0,173.045,0Z" transform="translate(-137.108)" fill="#4d5c7d"/>
          <path id="Path_11" d="M226.136,45.645a2.11,2.11,0,1,0,2.11,2.11A2.11,2.11,0,0,0,226.136,45.645Z" transform="translate(-180.157 -37.708)" fill="#3f51b5"/>
          <path id="Path_12" d="M230.8,0a1.129,1.129,0,0,0-1.129,1.129V9.924a1.129,1.129,0,0,0,2.258,0V1.129A1.129,1.129,0,0,0,230.8,0Z" transform="translate(-184.818)" fill="#4d5c7d"/>
          <g id="Group_1" transform="translate(15.853 25.768)">
            <path id="Path_13" d="M111.907,148.2h4.563v4.563h-4.563Z" transform="translate(-103.386 -148.197)" fill="#b0b6da"/>
            <path id="Path_14" d="M160.911,148.2h4.563v4.563h-4.563Z" transform="translate(-143.87 -148.197)" fill="#b0b6da"/>
            <path id="Path_15" d="M209.916,148.2h4.563v4.563h-4.563Z" transform="translate(-184.354 -148.197)" fill="#b0b6da"/>
            <path id="Path_16" d="M62.9,189.34h4.563V193.9H62.9Z" transform="translate(-62.902 -182.186)" fill="#b0b6da"/>
            <path id="Path_17" d="M111.907,189.34h4.563V193.9h-4.563Z" transform="translate(-103.386 -182.186)" fill="#b0b6da"/>
            <path id="Path_18" d="M160.911,189.34h4.563V193.9h-4.563Z" transform="translate(-143.87 -182.186)" fill="#b0b6da"/>
            <path id="Path_19" d="M209.916,189.34h4.563V193.9h-4.563Z" transform="translate(-184.354 -182.186)" fill="#b0b6da"/>
            <path id="Path_20" d="M62.9,230.483h4.563v4.563H62.9Z" transform="translate(-62.902 -216.175)" fill="#b0b6da"/>
            <path id="Path_21" d="M111.907,230.483h4.563v4.563h-4.563Z" transform="translate(-103.386 -216.175)" fill="#b0b6da"/>
            <path id="Path_22" d="M160.911,230.483h4.563v4.563h-4.563Z" transform="translate(-143.87 -216.175)" fill="#b0b6da"/>
          </g>
        </g>
      </svg>
    );
  }
}

export default Controller;
