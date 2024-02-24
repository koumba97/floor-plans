import { createContext, useState } from 'react';
import { FloorPlan } from '../types/FloorPlan';
import { uniqId } from '../utils/UniqId';

export const FloorPlanContext = createContext({
    floorPlans: [] as FloorPlan[],
    currentFloorPlan: {} as FloorPlan | null,
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
    const [currentFloorPlan, setCurrentFloorPlan] = useState<FloorPlan | null>(
        null
    );

    const addFloorPlan = (floorPlan: FloorPlan) => {
        setFloorPlans((prevFloorPlans) => [...prevFloorPlans, floorPlan]);
        setCurrentFloorPlan(floorPlan);
    };

    const getFloorPlansById = (floorPlansId: string): FloorPlan | null => {
        const result = floorPlans.find(
            (floorPlans) => floorPlans.id === floorPlansId
        );

        if (result) {
            setCurrentFloorPlan(result);
            return result;
        }

        setCurrentFloorPlan(null);
        return null;
    };

    const value = {
        floorPlans,
        currentFloorPlan,
        addFloorPlan,
        getFloorPlansById
    };
    return (
        <FloorPlanContext.Provider value={value}>
            {children}
        </FloorPlanContext.Provider>
    );
};
