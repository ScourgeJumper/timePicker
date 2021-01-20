/**
 * This file was generated from TimePicker.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export interface TimePickerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    animate: boolean;
    autoClose: boolean;
    dateAttribute: EditableValue<Date>;
    requiredMessage?: DynamicValue<string>;
    onChangeAction?: ActionValue;
    onEnterAction?: ActionValue;
}

export interface TimePickerPreviewProps {
    class: string;
    style: string;
    animate: boolean;
    autoClose: boolean;
    dateAttribute: string;
    requiredMessage: string;
    onChangeAction: {} | null;
    onEnterAction: {} | null;
}
