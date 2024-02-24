import { Link } from 'react-router-dom';
import { FloorPlan } from '../../../types/FloorPlan';
import './PlanList.scss';
import { useContext } from 'react';
import { FloorPlanContext } from '../../../contexts/FloorPlanContext';

interface Prop {
    plans: FloorPlan[];
}

const PlanList = ({ plans }: Prop) => {
    const { currentFloorPlan } = useContext(FloorPlanContext);

    return (
        <div className="plan-list">
            <Link to={'/'}>
                <div className={`item ${currentFloorPlan ? '' : 'active'}`}>
                    <div className="new-plan">
                        <i className="las la-plus"></i>
                    </div>
                </div>
            </Link>

            <>
                {plans.map((plan, index) => {
                    return (
                        <Link
                            to={`/floor-plan/${plan.id}`}
                            key={`item-list-${index}`}
                        >
                            <div
                                className={`item ${currentFloorPlan && currentFloorPlan.id === plan.id ? 'active' : ''}`}
                            >
                                <div
                                    className="new-plan"
                                    style={{
                                        backgroundImage: `url(${plan.image.cropped})`
                                    }}
                                >
                                    {index}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </>
        </div>
    );
};

export default PlanList;
