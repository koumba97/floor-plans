import './ImageCropper.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import { ImageFloorPlan } from '../../../types/ImageFloorPlan';
import { useParams } from 'react-router';
import { FloorPlanContext } from '../../../contexts/FloorPlanContext';

interface Prop {
    src: File | null;
    submitted: number;
    deleteImage: Function;
    selectImage: Function;
    imageData: Function;
}

const ImageCropper = ({
    src,
    deleteImage,
    selectImage,
    imageData,
    submitted
}: Prop) => {
    const [rotate, setRotate] = useState(0);
    const [croppedImage, setCroppedImage] = useState('');
    const [zoom, setZoom] = useState(1.2);
    const ROTATING_STEPS = 5;
    const editor = useRef<AvatarEditor>(null);
    const { currentFloorPlan } = useContext(FloorPlanContext);

    useEffect(() => {
        resetValues();
    }, [src]);

    useEffect(() => {
        onClickSave();
    }, [submitted]);

    useEffect(() => {
        if (currentFloorPlan) {
            setZoom(currentFloorPlan.image.zoom);
            setRotate(currentFloorPlan.image.rotate);
        }
    }, [currentFloorPlan]);

    const resetValues = () => {
        setRotate(0);
        setZoom(1.2);
    };

    const rotateImage = (direction: 'left' | 'right') => {
        if (direction === 'left') {
            setRotate(rotate - ROTATING_STEPS);
        } else {
            setRotate(rotate + ROTATING_STEPS);
        }
    };

    const zoomImage = (event: any) => {
        const { value } = event.target;
        setZoom(Number(value));
    };

    const handleDeleteImage = () => {
        deleteImage();
    };

    const onClickSave = () => {
        const img = editor.current?.getImageScaledToCanvas().toDataURL();

        if (img) {
            setCroppedImage(img);

            const imgData: ImageFloorPlan = {
                original: src,
                cropped: img,
                rotate,
                zoom
            };

            imageData(imgData);
        }
    };

    return (
        <div className="image-cropper">
            <p className="instruction">
                Drag the Floor Plan into the save window
            </p>
            <div className="image-wrapper">
                {src ? (
                    <AvatarEditor
                        ref={editor}
                        image={src}
                        width={450}
                        height={250}
                        color={[177, 177, 177, 0.6]}
                        scale={zoom}
                        rotate={rotate}
                    />
                ) : (
                    <Dropzone
                        onDrop={(file) => {
                            selectImage(file[0]);
                        }}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className="image-blank"></div>
                            </div>
                        )}
                    </Dropzone>
                )}
            </div>

            <div className={`image-controls ${src ? '' : 'disabled'}`}>
                <button
                    id="delete-image"
                    onClick={handleDeleteImage}
                    disabled={!src}
                >
                    <i className="las la-trash-alt"></i>
                </button>

                <div className="zoom-setting">
                    <span>-</span>
                    <input
                        disabled={!src}
                        type="range"
                        step={0.1}
                        min="1"
                        max="5"
                        value={zoom}
                        onChange={zoomImage}
                    />
                    <span>+</span>
                </div>
                <div className="rotate-setting">
                    <button
                        disabled={!src}
                        onMouseDown={() => rotateImage('left')}
                        id="rotate-left"
                    ></button>
                    <button
                        disabled={!src}
                        onMouseDown={() => rotateImage('right')}
                        id="rotate-right"
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default ImageCropper;
