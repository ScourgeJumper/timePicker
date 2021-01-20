import { createElement, CSSProperties, FunctionComponent } from "react";
import TimeKeeper, { TimeOutput } from "react-timekeeper";

export interface InputProps {
    index?: number;
    style?: CSSProperties;
    tabIndex?: number;
    value: string | undefined;
    
    animate?: boolean;
    autoClose?: boolean;
    onComplete?: (newTime:string, isChanged:boolean) => void
    
}


export const DateInput:FunctionComponent<InputProps> = (props) =>{    
    
   

    function onComplete(newTime:TimeOutput): void {
        const inputValue = props.value;
        const currentValue = newTime.formatted24
        if (props.onComplete) {
            props.onComplete(currentValue, currentValue !== inputValue);
        }
        
    }
    return (
        
            <TimeKeeper 
            
            time={props.value}
            
            switchToMinuteOnHourSelect={props.animate}
            closeOnMinuteSelect={props.autoClose}
            onDoneClick={onComplete}
            
        />
       
        
        
        
        
    );
    
}


