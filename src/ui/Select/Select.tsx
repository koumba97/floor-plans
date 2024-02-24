import './Select.scss';

interface Prop {
    options: { value: any; label: string }[];
    label?: string;
}

const Select = ({ options, label }: Prop) => {
    return (
        <div className="select">
            {label ? <label>{label}</label> : null}

            <div className="select-container">
                <select>
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
