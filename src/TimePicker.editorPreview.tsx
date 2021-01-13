import { Component, ReactNode, createElement } from "react";
import { TextInput } from "./components/TextInput";
import { TimePickerPreviewProps } from "../typings/TimePickerProps";

declare function require(name: string): string;
export class preview extends Component<TimePickerPreviewProps> {
    render(): ReactNode {
        return <TextInput value={this.props.dateAttribute}/>;
    }
}


export function getPreviewCss(): string {
    return require("./ui/TimePicker.css");
}
