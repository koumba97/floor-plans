export interface ImageFloorPlan {
    original: File | null,
    cropped: string,
    rotate: number,
    zoom: number,
    position: {x: number, y: number}
}
