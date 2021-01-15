import { Component, ReactNode, createElement, Fragment } from "react";
import { hot } from "react-hot-loader/root";

import { TimePickerContainerProps } from "../typings/TimePickerProps";
import { Alert } from "./components/Alert";
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
function changeTime(date:Date, time:string) {
    debugger;
    let parts = time.split(/\s|:/);
    let hours = parseInt(parts[0]);
    let minutes = parseInt(parts[1]);
    let meridian = parts[2];
    hours = hours == 12 ? 0 : hours;
    hours = meridian == 'PM' ? hours + 12 : hours;
    return new Date(date.setHours(hours, minutes));
    

}
   
class TimePicker extends Component<TimePickerContainerProps> {
    private readonly onLeaveHandle = this.onLeave.bind(this);
    componentDidMount(): void {
        this.props.dateAttribute.setValidator(this.validator.bind(this));
    }
    render(): ReactNode {
        const value = this.props.dateAttribute.value ? formatAMPM(this.props.dateAttribute.value)  : '';
        const validationFeedback = this.props.dateAttribute.validation;
        const required = !!(this.props.requiredMessage && this.props.requiredMessage.value);
        const placeholderText = 'h:mm AM/PM'
        return <Fragment>
        <TextInput 
        placeholderText={placeholderText}
        value={value}
        style={this.props.style}
        className={this.props.class}
        tabIndex={this.props.tabIndex}
        onLeave={this.onLeaveHandle}
        disabled={this.props.dateAttribute.readOnly}
        required={required}

        
        hasError={!!validationFeedback}
         />;
         <Alert>{validationFeedback}</Alert>
         <DateInput />;

        </Fragment>
         
    }
    private onLeave(value: string, isChanged: boolean): void {
        debugger;
        if (!isChanged) {
            return;
        }
        let date = this.props.dateAttribute.value ? this.props.dateAttribute.value : new Date();
        date = changeTime(date, value);
        this.props.dateAttribute.setValue(date);
    }
    
    
    private validator(value: Date | undefined): string | undefined {
        const { requiredMessage } = this.props;
        if (requiredMessage && requiredMessage.value && !value) {
            return requiredMessage.value;
        }
        return;
    }

}
export default hot(TimePicker);