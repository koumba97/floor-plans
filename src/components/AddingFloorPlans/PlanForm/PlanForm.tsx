import { useEffect, useRef, useState } from 'react';
import Input from '../../../ui/Input/Input';
import './PlanForm.scss';
import Select from '../../../ui/Select/Select';
import ImageCropper from '../ImageCropper/ImageCropper';

const defaultFormFields = {
    name: '',
    interiorSize: '',
    exteriorSize: '',
    typeSize: ''
};

const PlanForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imageData, setImageData] = useState<Object | undefined>(undefined);
    const [imagePreview, setImagePreview] = useState('');
    let [submitImage, setSubmitImage] = useState(0);
    const { name, interiorSize, exteriorSize } = formFields;
    const imageCropperRef = useRef<any>(null);

    useEffect(() => {
        console.log(imageData);
    }, [imageData]);

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

    const handleBrowseFile = () => {
        //document.getElementById('file-upload')!.click();
    };

    const handleSelectedImage = (file: File) => {
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleImageData = (data: any) => {
        setImageData(data);
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
                    browseFile={handleBrowseFile}
                    selectImage={handleSelectedImage}
                    imageData={handleImageData}
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
            <button onClick={() => setSubmitImage(submitImage + 1)}>
                Save
            </button>
        </div>
    );
};

export default PlanForm;
