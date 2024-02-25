import { useContext, useEffect, useState } from 'react';
import Input from '../../../ui/Input/Input';
import './PlanForm.scss';
import Select from '../../../ui/Select/Select';
import ImageCropper from '../ImageCropper/ImageCropper';
import { ImageFloorPlan } from '../../../types/ImageFloorPlan';
import { FloorPlanContext } from '../../../contexts/FloorPlanContext';
import { uniqId } from '../../../utils/UniqId';
import { useNavigate, useParams } from 'react-router';
import {
    FloorEnum,
    DirectionEnum,
    ExteriorEnum,
    FloorType,
    FacingDirection,
    ExteriorType
} from '../../../types/FloorPlan';
import Button from '../../../ui/Button/Button';

const defaultFormFields = {
    name: '',
    interiorSize: '',
    exteriorSize: '',
    exteriorType: '' as ExteriorType,
    floorType: '' as FloorType,
    facingDirection: '' as FacingDirection
};

const PlanForm = () => {
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imageData, setImageData] = useState<ImageFloorPlan | undefined>(
        undefined
    );
    const [_imagePreview, setImagePreview] = useState('');
    let [submitImage, setSubmitImage] = useState(0);
    const {
        name,
        interiorSize,
        exteriorSize,
        exteriorType,
        floorType,
        facingDirection
    } = formFields;
    const { floorPlanId } = useParams<string>();
    const { addFloorPlan, updateFloorPlan, deleteFloorPlan, currentFloorPlan } =
        useContext(FloorPlanContext);

    useEffect(() => {
        if (imageData) {
            if (handleValidation()) {
                if (floorPlanId) {
                    handleUpdateFormPlan();
                } else {
                    addingFloorPlans();
                }
            }
        }
    }, [imageData]);

    useEffect(() => {
        if (floorPlanId && currentFloorPlan) {
            setFormFields({
                name: currentFloorPlan.name,
                interiorSize: currentFloorPlan.interiorSize,
                exteriorSize: currentFloorPlan.exteriorSize,
                exteriorType: currentFloorPlan.exteriorType,
                floorType: currentFloorPlan.floorType,
                facingDirection: currentFloorPlan.facingDirection
            });

            setSelectedImage(currentFloorPlan.image.original);
        } else {
            setFormFields(defaultFormFields);
            setSelectedImage(null);
        }
    }, [currentFloorPlan, floorPlanId]);

    const handleValidation = (): boolean => {
        let errors = [];
        for (const [key, value] of Object.entries(formFields)) {
            if (!value) {
                errors.push(key);
            }
        }
        if (errors.length === 0) {
            return true;
        } else {
            alert('All the fields must be filled');
            return false;
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
            const id = uniqId();
            addFloorPlan({
                ...formFields,
                id,
                image: imageData
            });

            navigate(`/floor-plan/${id}`);
            alert('The floor plan has been successfully added!');
        }
    };

    const submitPlanForm = () => {
        setSubmitImage(submitImage + 1);
    };

    const handleUpdateFormPlan = () => {
        if (handleValidation() && floorPlanId && imageData) {
            updateFloorPlan(floorPlanId, {
                ...formFields,
                id: floorPlanId,
                image: imageData
            });
            alert('The floor plan has been successfully updated!');
        }
    };

    const handleDeleteFormPlan = () => {
        const resp = confirm(
            'Are you sure you want to delete this floor plan?'
        );
        if (floorPlanId && resp) {
            deleteFloorPlan(floorPlanId);
            navigate('/');
        }
    };

    return (
        <div className="plan-form">
            <h3>Adjust Floor Plans</h3>
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
                        value={exteriorType}
                        name="exteriorType"
                        placeholder="Select"
                        onChange={handleInputChange}
                        options={[
                            {
                                value: 'apartment',
                                label: ExteriorEnum.apartment
                            },
                            { value: 'house', label: ExteriorEnum.house }
                        ]}
                    />

                    <Select
                        label="Facing Direction (Variable)"
                        value={facingDirection}
                        placeholder="Select"
                        name="facingDirection"
                        onChange={handleInputChange}
                        options={[
                            { value: 'north', label: DirectionEnum.north },
                            { value: 'east', label: DirectionEnum.east },
                            { value: 'south', label: DirectionEnum.south },
                            { value: 'west', label: DirectionEnum.west }
                        ]}
                    />

                    <Select
                        label="Select Floor Type"
                        value={floorType}
                        placeholder="Select"
                        name="floorType"
                        onChange={handleInputChange}
                        options={[
                            { value: 'studio', label: FloorEnum.studio },
                            {
                                value: 'oneBedOneBath',
                                label: FloorEnum.oneBedOneBath
                            },
                            {
                                value: 'twoBedOneBath',
                                label: FloorEnum.twoBedOneBath
                            },
                            {
                                value: 'threeBedTwoBed',
                                label: FloorEnum.threeBedTwoBed
                            }
                        ]}
                    />
                </form>
            </div>
            <div className="buttons-container">
                {floorPlanId ? (
                    <>
                        <Button style="outlined" onClick={handleDeleteFormPlan}>
                            Delete
                        </Button>
                        <Button onClick={submitPlanForm}>Update</Button>
                    </>
                ) : (
                    <Button onClick={submitPlanForm}>Save</Button>
                )}
            </div>
        </div>
    );
};

export default PlanForm;
