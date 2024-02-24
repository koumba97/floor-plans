import { useState } from 'react';
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
    const [imagePreview, setImagePreview] = useState('');
    const { name, interiorSize, exteriorSize } = formFields;

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
        document.getElementById('file-upload')!.click();
    };

    return (
        <div className="plan-form">
            <h3>Adjust Floor Plans</h3>
            <div className="content">
                <div>
                    <ImageCropper
                        src={selectedImage}
                        deleteImage={handleDeleteImage}
                        browseFile={handleBrowseFile}
                    />
                    <input
                        type="file"
                        name="myImage"
                        id="file-upload"
                        onChange={(event) => {
                            if (event.target.files) {
                                setSelectedImage(event.target.files[0]);
                                setImagePreview(
                                    URL.createObjectURL(event.target.files[0])
                                );
                            }
                        }}
                    />
                </div>
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
        </div>
    );
};

export default PlanForm;
