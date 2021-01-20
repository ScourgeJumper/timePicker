import { Component, createElement, ReactNode } from "react";
import { TimePickerPreviewProps } from "../typings/TimePickerProps";
import { TextInput } from "./components/TextInput";

declare function require(name: string): string;

export class preview extends Component<TimePickerPreviewProps> {
    render(): ReactNode {
        const value = `[${this.props.dateAttribute}]`;
        return <TextInput value={value} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/TimePicker.css");
}
