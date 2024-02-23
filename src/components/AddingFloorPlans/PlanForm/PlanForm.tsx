import { useState } from 'react';
import Input from '../../../ui/Input/Input';
import './PlanForm.scss';

const defaultFormFields = {
    name: '',
    interiorSize: '',
    exteriorSize: '',
    typeSize: ''
};

const PlanForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { name, interiorSize, exteriorSize } = formFields;

    const handleInputChange = (newValue: {
        name: string;
        value: string | number | undefined;
    }) => {
        setFormFields({ ...formFields, [newValue.name]: newValue.value });
    };

    return (
        <div className="plan-form">
            <h3>Adjust Floor Plans</h3>
            <div className="content">
                <div className="image"></div>
                <form>
                    <Input
                        label="Floor name"
                        value={name}
                        onChange={handleInputChange}
                        type="text"
                        name="name"
                        placeholder=""
                        required={true}
                    />

                    <Input
                        label="Interior size"
                        value={interiorSize}
                        onChange={handleInputChange}
                        type="text"
                        name="interiorSize"
                        placeholder=""
                        required={true}
                    />

                    <Input
                        label="Exterior size"
                        value={exteriorSize}
                        onChange={handleInputChange}
                        type="text"
                        name="exteriorSize"
                        placeholder=""
                        required={true}
                    />
                </form>
            </div>
        </div>
    );
};

export default PlanForm;
