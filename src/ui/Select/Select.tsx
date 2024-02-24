import { placeholder } from '@babel/types';
import './Select.scss';
import { useEffect, useState } from 'react';

interface Prop {
    options: { value: any; label: string }[];
    label?: string;
    name: string;
    placeholder?: string;
    value: string | number | undefined;
    onChange?: Function;
}

const Select = ({
    options,
    label,
    name,
    placeholder,
    value,
    onChange
}: Prop) => {
    const handleChange = (event: any) => {
        const { value } = event.target;

        console.log(value);

        if (onChange) {
            onChange({ name: name, value: value });
        }
    };

    return (
        <div className="select">
            {label ? <label>{label}</label> : null}

            <div className="select-container">
                <select value={value} onChange={handleChange}>
                    {placeholder ? (
                        <option disabled value="">
                            {placeholder}
                        </option>
                    ) : null}
                    {options.map((option, index) => {
                        return (
                            <option
                                value={option.value}
                                key={`option-${index}`}
                            >
                                {option.label}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};

export default Select;
