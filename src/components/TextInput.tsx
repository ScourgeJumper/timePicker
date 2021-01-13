import classNames from "classnames";
import { Component, ReactNode, createElement, CSSProperties, ChangeEvent } from "react";

export interface InputProps {
    value: string;
    className?: string;
    index?: number;
    style?: CSSProperties;
    tabIndex?: number;
    onLeave?: (value: string, changed:boolean) => void;
}
interface InputState {
    editedValue?: string;
}
export class TextInput extends Component<InputProps> {
    private readonly onChangeHandle = this.onChange.bind(this);
    private readonly onBlurHandle = this.onBlur.bind(this);
    readonly state: InputState = {editedValue: undefined};
    componentDidUpdate(prevProps: InputProps): void {
        if (this.props.value !== prevProps.value) {
            this.setState({ editedValue: undefined });
        }
    }
    render(): ReactNode {
        const className = classNames("form-control", this.props.className);
        return <input 
            type="text" 
            className={className}
            value={this.getCurrentValue()} 
            tabIndex={this.props.tabIndex}
            onChange={this.onChangeHandle}
            onBlur={this.onBlurHandle}
        />;
    }
    private getCurrentValue(): string {
        return this.state.editedValue !== undefined
        ? this.state.editedValue
        : this.props.value;
    }

    private onChange(event: ChangeEvent<HTMLInputElement>): void {
        this.setState({ editedValue: event.target.value })
    }
    private onBlur(): void {
        const inputValue = this.props.value;
        const currentValue = this.getCurrentValue();
        if (this.props.onLeave) {
            this.props.onLeave(currentValue, currentValue !== inputValue);
        }
        this.setState({ editedValue: undefined});
    }
}