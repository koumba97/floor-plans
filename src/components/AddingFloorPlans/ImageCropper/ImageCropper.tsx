import './ImageCropper.scss';
import { useState, useEffect } from 'react';
import AvatarEditor from 'react-avatar-editor';

const ImageCropper = () => {
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
        setZoom(value);
    };

    return (
        <div className="image-cropper">
            <AvatarEditor
                image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
                width={450}
                height={250}
                color={[177, 177, 177, 0.6]}
                scale={zoom}
                rotate={rotate}
            />

            <div className="image-controls">
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
