import { useContext, useEffect } from 'react';
import PlanForm from '../components/AddingFloorPlans/PlanForm/PlanForm';
import PlanList from '../components/AddingFloorPlans/PlanList/PlanList';
import './AddingFloorPlans.scss';
import { FloorPlanContext } from '../contexts/FloorPlanContext';
import { useParams } from 'react-router';

const AddingFloorPlans = () => {
    const { floorPlans, getFloorPlansById } = useContext(FloorPlanContext);
    const { floorPlanId } = useParams<string>();

    useEffect(() => {
        if (floorPlanId) {
            getFloorPlansById(floorPlanId);
        }
    }, [floorPlanId]);

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
