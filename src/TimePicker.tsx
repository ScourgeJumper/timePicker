import { Component, ReactNode, createElement } from "react";
import { hot } from "react-hot-loader/root";


import { TimePickerContainerProps } from "../typings/TimePickerProps";
import { Alert } from "./components/Alert";
import { DateInput } from "./components/DateInput";
import { TextInput } from "./components/TextInput";

import "./ui/TimePicker.css";

function formatAMPM(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const minuteString = minutes < 10 ? "0" + minutes : minutes;
    const hourString = hours < 10 ? "0" + hours : hours;
    const strTime = hourString + ":" + minuteString;
    return strTime;
}
function changeTime(date: Date, time: string) {
    const parts = time.split(/\s|:/);
    let hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    const meridian = parts[2];
    hours = meridian == "PM" ? hours + 12 : hours;
    return new Date(date.setHours(hours, minutes));
}
interface TimePickerContainerState {
    showClock?: boolean;
}
class TimePicker extends Component<TimePickerContainerProps, TimePickerContainerState> {
    private readonly onCompleteHandle = this.onComplete.bind(this);
    private readonly onEnterHandle = this.onEnter.bind(this);
    private readonly onFocusHandle = this.onFocus.bind(this);
    readonly state: TimePickerContainerState = {showClock: false};
    componentDidMount(): void {
        this.props.dateAttribute.setValidator(this.validator.bind(this));
    }
    render(): ReactNode {
        const value = this.props.dateAttribute.value ? formatAMPM(this.props.dateAttribute.value) : undefined;
        const validationFeedback = this.props.dateAttribute.validation;
        const required = !!(this.props.requiredMessage && this.props.requiredMessage.value);
        
        return (
            <div className="time-picker">
                <TextInput
                    value={value}
                    style={this.props.style}
                    className={this.props.class}
                    tabIndex={this.props.tabIndex}
                    onComplete={this.onCompleteHandle}
                    disabled={this.props.dateAttribute.readOnly}
                    required={required}
                    onEnter={this.onEnterHandle}
                    hasError={!!validationFeedback}
                    onClick={this.onFocusHandle}
                />
                <Alert>{validationFeedback}</Alert>
                {this.state.showClock &&   
                    <DateInput  
                    value={value}
                    animate={this.props.animate}
                    autoClose={this.props.autoClose}
                    onComplete={this.onCompleteHandle}
                    />
                }
            </div>
        );
    }
    private onComplete(value: string, isChanged: boolean): void {
        this.setState({showClock:false})
        if (!isChanged) {
            return;
        }
        let date = this.props.dateAttribute.value ? this.props.dateAttribute.value : new Date();
        date = changeTime(date, value);
        this.props.dateAttribute.setValue(date);
        
    }
    private onEnter(): void {
        this.props.onEnterAction?.execute();
    }
    private validator(value: Date | undefined): string | undefined {
        const { requiredMessage } = this.props;
        if (requiredMessage && requiredMessage.value && !value) {
            return requiredMessage.value;
        }
    }
    private onFocus(): void {
        this.setState({ showClock: true})
    }
}
export default hot(TimePicker);
