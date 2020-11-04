import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputEl = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case 'input':
            inputEl = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case 'textarea':
            inputEl = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case 'select':
            inputEl = (
                <select className={classes.Select} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map((element) => (
                        <option value={element.value} key={element.value}>
                            {element.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputEl = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputEl}
        </div>
    );
};

export default input;
