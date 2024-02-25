import { createContext, useState } from 'react';
import FloorPlan from '../types/FloorPlan';
import { uniqId } from '../utils/UniqId';

export const FloorPlanContext = createContext({
    floorPlans: [] as FloorPlan[],
    currentFloorPlan: {} as FloorPlan | null,
    addFloorPlan: (_floorPlan: FloorPlan) => {},
    updateFloorPlan: (_floorPlanId: string, _floorPlan: FloorPlan) => {},
    getFloorPlansById: (_floorPlanId: string) => {},
    deleteFloorPlan: (_floorPlanId: string) => {}
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

    const updateFloorPlan = (floorPlanId: string, floorPlan: FloorPlan) => {
        const index = floorPlans.findIndex(
            (floorPlans) => floorPlans.id === floorPlanId
        );
        const newFloorPlans = [...floorPlans];
        newFloorPlans[index] = floorPlan;
        setFloorPlans((prevFloorPlans) => [...newFloorPlans]);
        setCurrentFloorPlan(floorPlan);
    };

    const deleteFloorPlan = (floorPlanId: string): void => {
        const index = floorPlans.findIndex(
            (floorPlans) => floorPlans.id === floorPlanId
        );
        const newFloorPlans = [...floorPlans];
        newFloorPlans.splice(index, 1);
        setFloorPlans((prevFloorPlans) => [...newFloorPlans]);
        setCurrentFloorPlan(null);
    };

    const getFloorPlansById = (floorPlanId: string): FloorPlan | null => {
        const result = floorPlans.find(
            (floorPlans) => floorPlans.id === floorPlanId
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
        updateFloorPlan,
        getFloorPlansById,
        deleteFloorPlan
    };
    return (
        <FloorPlanContext.Provider value={value}>
            {children}
        </FloorPlanContext.Provider>
    );
};
