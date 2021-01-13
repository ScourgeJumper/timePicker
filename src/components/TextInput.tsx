import classNames from "classnames";
import { Component, ReactNode, createElement, CSSProperties } from "react";

export interface InputProps {
    value: string;
    className?: string;
    index?: number;
    style?: CSSProperties;
    tabIndex?: number;
}

export class TextInput extends Component<InputProps> {
    render(): ReactNode {
        const className = classNames("form-control", this.props.className);
        return <input 
            type="text" 
            className={className}
            value={this.props.value} 
        />;
    }
}