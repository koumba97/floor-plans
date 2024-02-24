import { ImageFloorPlan } from './ImageFloorPlan';

export default interface FloorPlan {
    id: string;
    image: ImageFloorPlan;
    name: string;
    interiorSize: string;
    exteriorSize: string;
    exteriorType: ExteriorType;
    floorType: FloorType;
    facingDirection: FacingDirection;
}

export enum FloorEnum {
    studio = 'Studio',
    oneBedOneBath = 'One Bedroom One Bathroom',
    twoBedOneBath = 'Two Bedrooms One Bathroom',
    threeBedTwoBed = 'Three Bedrooms  Two Bathrooms'
}
export type FloorType =
    | FloorEnum.studio
    | FloorEnum.oneBedOneBath
    | FloorEnum.twoBedOneBath
    | FloorEnum.threeBedTwoBed;

export enum DirectionEnum {
    north = 'North',
    south = 'South',
    east = 'East',
    west = 'West'
}
export type FacingDirection =
    | DirectionEnum.north
    | DirectionEnum.south
    | DirectionEnum.east
    | DirectionEnum.west;

export enum ExteriorEnum {
    apartment = 'Apartment',
    house = 'House'
}
export type ExteriorType = ExteriorEnum.apartment | ExteriorEnum.house;
