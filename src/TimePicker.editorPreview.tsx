import { Component, ReactNode, createElement } from "react";
import { DateInput } from "./components/DateInput";
import { TimePickerPreviewProps } from "../typings/TimePickerProps";

declare function require(name: string): string;
export class preview extends Component<TimePickerPreviewProps> {
    render(): ReactNode {
        const value = `[${this.props.dateAttribute}]`;
        return <DateInput value={value} />;
    }
}


export function getPreviewCss(): string {
    return require("./ui/TimePicker.css");
}
