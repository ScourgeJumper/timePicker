import { Component, ReactNode, createElement, Fragment } from "react";
import { Alert } from "./components/Alert";
import { hot } from "react-hot-loader/root";


import { TimePickerContainerProps } from "../typings/TimePickerProps";
import { DateInput } from "./components/DateInput";

import "./ui/TimePicker.css";

class TimePicker extends Component<TimePickerContainerProps> {
    private readonly onLeaveHandle = this.onLeave.bind(this);
    componentDidMount(): void {
        this.props.dateAttribute.setValidator(this.validator.bind(this));
    }
    render(): ReactNode {
        const value = this.props.dateAttribute.value || "";
        const validationFeedback = this.props.dateAttribute.validation;
        const required = !!(this.props.requiredMessage && this.props.requiredMessage.value);
        return (
            <Fragment>
                <DateInput
                    id={this.props.id}
                    value={value}
                    style={this.props.style}
                    className={this.props.class}
                    tabIndex={this.props.tabIndex}
                    disabled={this.props.dateAttribute.readOnly}
                    onLeave={this.onLeaveHandle}
                    required={required}
                    hasError={!!validationFeedback}
                />
                <Alert id={this.props.id + "-error"}>{validationFeedback}</Alert>
            </Fragment>
        );
    }
    private isReadOnly(): boolean {
    return this.props.dateAttribute.readOnly;
    }
    private onLeave(value: Date, isChanged: boolean): void {
        if (!isChanged) {
            return;
        }
        this.props.dateAttribute.setValue(value);
    }
    private validator(value: string | undefined): string | undefined {
        const { requiredMessage } = this.props;
        if (requiredMessage && requiredMessage.value && !value) {
            return requiredMessage.value;
        }
        return;
    }
}

export default hot(TimePicker);