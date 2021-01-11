import { Component, ReactNode, createElement } from "react";
import { hot } from "react-hot-loader/root";

import { TimePickerContainerProps } from "../typings/TimePickerProps";
import { TextInput } from "./components/TextInput";

import "./ui/TextBox.css";

class TextBox extends Component<TimePickerContainerProps> {
    render(): ReactNode {
        const value = this.props.textAttribute.value || "";
        return <TextInput value={value} />;
    }
}

export default hot(TextBox);