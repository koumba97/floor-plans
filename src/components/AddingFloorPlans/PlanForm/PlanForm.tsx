import { useContext, useEffect, useRef, useState } from 'react';
import Input from '../../../ui/Input/Input';
import './PlanForm.scss';
import Select from '../../../ui/Select/Select';
import ImageCropper from '../ImageCropper/ImageCropper';
import { ImageFloorPlan } from '../../../types/ImageFloorPlan';
import { FloorPlanContext } from '../../../contexts/FloorPlanContext';
import { uniqId } from '../../../utils/UniqId';

const defaultFormFields = {
    name: 'a',
    interiorSize: 'a',
    exteriorSize: 'a'
};

const PlanForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imageData, setImageData] = useState<ImageFloorPlan | undefined>(
        undefined
    );
    const [imagePreview, setImagePreview] = useState('');
    let [submitImage, setSubmitImage] = useState(0);
    const { name, interiorSize, exteriorSize } = formFields;
    const imageCropperRef = useRef<any>(null);

    const { addFloorPlan } = useContext(FloorPlanContext);

    useEffect(() => {
        if (imageData) {
            handleValidation();
        }
    }, [imageData]);

    const handleValidation = () => {
        let errors = [];
        for (const [key, value] of Object.entries(formFields)) {
            if (!value) {
                errors.push(key);
            }
        }
        if (errors.length === 0) {
            addingFloorPlans();
            console.log('valid');
        } else {
            // display errors
            console.log('not valid', errors);
        }
    };

    const handleInputChange = (newValue: {
        name: string;
        value: string | number | undefined;
    }) => {
        setFormFields({ ...formFields, [newValue.name]: newValue.value });
    };

    const handleDeleteImage = () => {
        setSelectedImage(null);
        setImagePreview('');
    };

    const handleSelectedImage = (file: File) => {
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const storeImageData = (data: any) => {
        setImageData(data);
    };

    const addingFloorPlans = () => {
        if (imageData) {
            addFloorPlan({
                id: uniqId(),
                image: imageData,
                ...formFields
            });
        }
    };

    const submitPlanForm = () => {
        setSubmitImage(submitImage + 1);
    };

    return (
        <div className="plan-form">
            <h3>Adjust Floor Plans</h3>
            {submitImage}
            <div className="content">
                <ImageCropper
                    src={selectedImage}
                    submitted={submitImage}
                    deleteImage={handleDeleteImage}
                    selectImage={handleSelectedImage}
                    imageData={storeImageData}
                />

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

                    <Select
                        label="Exterior type"
                        options={[
                            { value: 'test', label: 'test' },
                            { value: 'test2', label: 'test2' }
                        ]}
                    />

                    <Select
                        label="Facing Direction (Variable)"
                        options={[
                            { value: 'test', label: 'test' },
                            { value: 'test2', label: 'test2' }
                        ]}
                    />

                    <Select
                        label="Select Floor Type"
                        options={[
                            { value: 'test', label: 'test' },
                            { value: 'test2', label: 'test2' }
                        ]}
                    />
                </form>
            </div>
            <button onClick={submitPlanForm}>Save</button>
        </div>
    );
};

export default PlanForm;
