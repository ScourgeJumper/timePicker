import { Component, ReactNode, createElement, CSSProperties } from "react";
import TimeKeeper from 'react-timekeeper';

export interface InputProps {
    className?: string;
    index?: number;
    style?: CSSProperties;
    tabIndex?: number;
}

export class DateInput extends Component<InputProps> {
    render(): ReactNode {
        return <div>
            <TimeKeeper/>
        </div>;
    }
}