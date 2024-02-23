import PlanForm from '../components/AddingFloorPlans/PlanForm/PlanForm';
import PlanList from '../components/AddingFloorPlans/PlanList/PlanList';
import './AddingFloorPlans.scss';

const AddingFloorPlans = () => {
    return (
        <div className="adding-floor-plans">
            <h2>Adding floor Plans</h2>
            <div className="content">
                <PlanList />
                <PlanForm />
            </div>
        </div>
    );
};

export default AddingFloorPlans;
