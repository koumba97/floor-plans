import './ImageCropper.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import { ImageFloorPlan } from '../../../types/ImageFloorPlan';
import { useParams } from 'react-router';
import { FloorPlanContext } from '../../../contexts/FloorPlanContext';
import {
    SM_BREAKPOINT,
    MD_BREAKPOINT,
    LG_BREAKPOINT
} from '../../../Variables';

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
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [canvasWidth, setCanvasWidth] = useState(500);
    const ROTATING_STEPS = 5;
    const editor = useRef<AvatarEditor>(null);
    const { currentFloorPlan } = useContext(FloorPlanContext);
    const { floorPlanId } = useParams<string>();

    useEffect(() => {
        if (!floorPlanId) {
            resetValues();
        }
    }, [src]);

    useEffect(() => {
        if (submitted > 0) {
            onClickSave();
        }
    }, [submitted]);

    useEffect(() => {
        if (currentFloorPlan) {
            setZoom(currentFloorPlan.image.zoom);
            setRotate(currentFloorPlan.image.rotate);
            setPosition(currentFloorPlan.image.position);
        }
    }, [currentFloorPlan, floorPlanId]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleResize = () => {
        const width = document.body.clientWidth;
        const SM_CANVA_RATIO = 150;
        const MD_CANVA_RATIO = 200;
        const LG_CANVA_RATIO = 500;

        console.log(width);

        if (width < SM_BREAKPOINT) {
            console.log('sm');
            setCanvasWidth(width - SM_CANVA_RATIO);
        } else if (SM_BREAKPOINT < width && width < MD_BREAKPOINT) {
            console.log('md');
            setCanvasWidth(width - MD_CANVA_RATIO);
        } else if (MD_BREAKPOINT < width && width < 800) {
            console.log('lg');
            setCanvasWidth(width - LG_CANVA_RATIO);
        } else if (800 < width && width < 1030) {
            console.log(800, 1030);
            setCanvasWidth(width - 600);
        } else if (1030 < width) {
            console.log('+' + 1030);
            setCanvasWidth(450);
        }
    };

    const resetValues = () => {
        setRotate(0);
        setZoom(1.2);
        setPosition({ x: 0, y: 0 });
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

    const handlePositionChange = (position: { x: number; y: number }) => {
        setPosition(position);
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
                zoom,
                position
            };

            imageData(imgData);
        } else {
            alert('A floor plan image must be uploaded');
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
                        className="testtt"
                        ref={editor}
                        image={src}
                        width={canvasWidth}
                        height={250}
                        color={[177, 177, 177, 0.6]}
                        scale={zoom}
                        rotate={rotate}
                        position={position}
                        onPositionChange={handlePositionChange}
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
                                <div
                                    className="image-blank"
                                    style={{ width: canvasWidth }}
                                >
                                    <p>Drag the image or Browse to open</p>
                                </div>
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
