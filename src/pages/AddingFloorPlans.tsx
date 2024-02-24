import { useContext, useState } from 'react';
import PlanForm from '../components/AddingFloorPlans/PlanForm/PlanForm';
import PlanList from '../components/AddingFloorPlans/PlanList/PlanList';
import './AddingFloorPlans.scss';
import { FloorPlanContext } from '../contexts/FloorPlanContext';

const AddingFloorPlans = () => {
    const { floorPlans } = useContext(FloorPlanContext);

    return (
        <div className="adding-floor-plans">
            <h2>Adding floor Plans</h2>
            <div className="content">
                <PlanList plans={floorPlans} />
                <PlanForm />
            </div>
        </div>
    );
};

export default AddingFloorPlans;
