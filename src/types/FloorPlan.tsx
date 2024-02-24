import { ImageFloorPlan } from './ImageFloorPlan';

export interface FloorPlan {
    id: string;
    image: ImageFloorPlan;
    name: string;
    interiorSize: string;
    exteriorSize: string;
    // exteriorType: ExteriorType;
    // floorType: FloorType;
}

type FloorType = 'studio' | '1bed1bath' | '2bed1bath' | '3bed2bath';

type ExteriorType = 'apartment' | 'house';
