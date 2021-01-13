import { Component, ReactNode, createElement, Fragment } from "react";
import { hot } from "react-hot-loader/root";
//import TimeKeeper from "react-timekeeper";

import { TimePickerContainerProps } from "../typings/TimePickerProps";
import { DateInput } from "./components/DateInput";
import { TextInput } from "./components/TextInput";

import "./ui/TimePicker.css";

function formatAMPM(date:Date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var minuteString = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minuteString + ' ' + ampm;
    return strTime;
  }
   
class TimePicker extends Component<TimePickerContainerProps> {
    render(): ReactNode {
        const value = this.props.dateAttribute.value ? formatAMPM(this.props.dateAttribute.value)  : '';
        return <Fragment>
        <TextInput 
        value={value}
        style={this.props.style}
        className={this.props.class}
        tabIndex={this.props.tabIndex}
         />;
         <DateInput />;

        </Fragment>
         
    }
}

export default hot(TimePicker);