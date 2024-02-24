import { createContext, useState } from 'react';
import { FloorPlan } from '../types/FloorPlan';
import { uniqId } from '../utils/UniqId';

export const FloorPlanContext = createContext({
    floorPlans: [] as FloorPlan[],
    addFloorPlan: (_floorPlan: FloorPlan) => {},
    getFloorPlansById: (_floorPlanId: string): FloorPlan | null => {
        return null;
    }
});

interface FloorPlanProviderInterface {
    children: any;
}

export const FloorPlanProvider = ({ children }: FloorPlanProviderInterface) => {
    const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([]);

    const addFloorPlan = (floorPlan: FloorPlan) => {
        console.log('click');

        setFloorPlans((prevFloorPlans) => [...prevFloorPlans, floorPlan]);
        console.log(floorPlans);
    };

    const getFloorPlansById = (floorPlansId: string): FloorPlan | null => {
        const result = floorPlans.find(
            (floorPlans) => floorPlans.name === floorPlansId
        );
        return result ? result : null;
    };

    const value = { floorPlans, addFloorPlan, getFloorPlansById };
    return (
        <FloorPlanContext.Provider value={value}>
            {children}
        </FloorPlanContext.Provider>
    );
};
