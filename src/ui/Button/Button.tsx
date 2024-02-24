import './Button.scss';

interface IProp {
    children: any;
    type?: 'button' | 'submit' | 'reset';
    style?: 'regular' | 'outlined';
    disabled?: boolean;
    onClick?: Function;
}

const Button = ({
    children,
    type = 'button',
    onClick,
    disabled = false,
    style = 'regular'
}: IProp) => {
    const handleClick = () => {
        if (onClick && !disabled) onClick();
    };
    return (
        <button
            className={`button ${style}`}
            type={type}
            onClick={handleClick}
            disabled={disabled}
        >
            <p className="button-content">{children}</p>
        </button>
    );
};

export default Button;
