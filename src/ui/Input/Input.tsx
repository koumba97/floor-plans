import './Input.scss';

interface IProps {
    type: 'text' | 'number' | 'password' | 'email';
    label?: string;
    value: string | number | undefined;
    placeholder: string;
    required: boolean;
    name: string;
    onChange?: Function;
}
const Input = ({
    type,
    label,
    value,
    placeholder,
    required,
    name,
    onChange
}: IProps) => {
    const handleChange = (event: any) => {
        const { value } = event.target;

        if (onChange) {
            onChange({ name: name, value: value });
        }
    };

    return (
        <div className="input">
            {label ? <label>{label}</label> : null}

            <div className="input-container">
                <input
                    type={type}
                    onChange={handleChange}
                    value={value}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                ></input>
            </div>
        </div>
    );
};

export default Input;
