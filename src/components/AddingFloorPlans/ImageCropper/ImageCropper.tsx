import './ImageCropper.scss';
import { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

interface Prop {
    src: File | null;
    deleteImage: Function;
    browseFile: Function;
}

const ImageCropper = ({ src, deleteImage, browseFile }: Prop) => {
    const [rotate, setRotate] = useState(0);
    const [zoom, setZoom] = useState(1.2);
    const ROTATING_STEPS = 5;

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

    return (
        <div className="image-cropper" onClick={() => browseFile()}>
            <p className="instruction">
                Drag the Floor Plan into the save window
            </p>
            <div className="image-wrapper">
                {src ? (
                    <AvatarEditor
                        image={src}
                        width={450}
                        height={250}
                        color={[177, 177, 177, 0.6]}
                        scale={zoom}
                        rotate={rotate}
                    />
                ) : null}
            </div>

            <div className="image-controls">
                <button id="delete-image" onClick={handleDeleteImage}>
                    <i className="las la-trash-alt"></i>
                </button>

                <div className="zoom-setting">
                    <span>-</span>
                    <input
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
                        onMouseDown={() => rotateImage('left')}
                        id="rotate-left"
                    ></button>
                    <button
                        onMouseDown={() => rotateImage('right')}
                        id="rotate-right"
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default ImageCropper;
