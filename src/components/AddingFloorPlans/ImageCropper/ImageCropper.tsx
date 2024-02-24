import './ImageCropper.scss';
import { useState, useCallback } from 'react';
import AvatarEditor from 'react-avatar-editor';

const ImageCropper = () => {
    const [rotate, setRotate] = useState(0);

    const rotateImage = (direction: 'left' | 'right') => {
        if (direction === 'left') {
            setRotate(rotate - 1);
        } else {
            setRotate(rotate + 1);
        }
    };

    return (
        <div className="image-cropper">
            <AvatarEditor
                image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
                width={450}
                height={250}
                color={[255, 255, 255, 0.6]}
                scale={1.2}
                rotate={rotate}
            />

            <div className="rotate-setting">
                <button onMouseDown={() => rotateImage('left')}>left</button>
                <button onMouseDown={() => rotateImage('right')}>right</button>
            </div>
        </div>
    );
};

export default ImageCropper;
