import classNames from "classnames";
import { Component, ReactNode, createElement, CSSProperties, ChangeEvent, KeyboardEvent } from "react";

export interface InputProps {
    id?: string;
    value: string | undefined;
    className?: string;
    index?: number;
    style?: CSSProperties;
    tabIndex?: number;
    hasError?: boolean;
    required?: boolean;
    disabled?: boolean;
    onComplete?: (value: string | undefined, changed: boolean) => void;
    onEnter?: () => void;
    placeholderText?: string;
    onClick?: () => void;
}
interface InputState {
    editedValue?: string;
}
export class TextInput extends Component<InputProps> {
    private readonly onChangeHandle = this.onChange.bind(this);
    private readonly onCompleteHandle = this.onComplete.bind(this);
    private readonly onEnterHandle = this.onEnter.bind(this);
    readonly state: InputState = { editedValue: undefined };
    private readonly onFocusHandle = this.onFocus.bind(this);
    componentDidUpdate(prevProps: InputProps): void {
        if (this.props.value !== prevProps.value) {
            this.setState({ editedValue: undefined });
        }
    }
    render(): ReactNode {
        const className = classNames("form-control", "text-input", this.props.className);
        const labelledby = `${this.props.id}-label` + (this.props.hasError ? ` ${this.props.id}-error` : "");
        return (
            <input
                id={this.props.id}
                type="time"
                className={className}
                style={this.props.style}
                value={this.getCurrentValue()}
                tabIndex={this.props.tabIndex}
                onChange={this.onChangeHandle}
                disabled={this.props.disabled}
                onBlur={this.onCompleteHandle}
                aria-labelledby={labelledby}
                aria-invalid={this.props.hasError}
                aria-required={this.props.required}
                required={this.props.required}
                onKeyDown={this.onEnterHandle}
                onFocus={this.onFocusHandle}
                
            />
        );
    }
    private getCurrentValue(): string | undefined{
        return this.state.editedValue !== undefined ? this.state.editedValue : this.props.value;
    }

    private onChange(event: ChangeEvent<HTMLInputElement>): void {
        this.setState({ editedValue: event.target.value });
    }
    private onComplete(): void {
        const inputValue = this.props.value;
        const currentValue = this.getCurrentValue();
        if (this.props.onComplete) {
            this.props.onComplete(currentValue, currentValue !== inputValue);
        }
        this.setState({ editedValue: undefined });
    }
    private onEnter(event: KeyboardEvent<HTMLInputElement>): void {
        if (event.key === "Enter") {
            this.onComplete();
            if(this.props.onEnter) {
                this.props.onEnter();
            }
        }
    }
    private onFocus(): void {
        if (this.props.onClick) {
            this.props.onClick();
        }
        
    }
}
