import { Link, useParams } from 'react-router-dom';
import FloorPlan from '../../../types/FloorPlan';
import './PlanList.scss';
import { useContext } from 'react';
import { FloorPlanContext } from '../../../contexts/FloorPlanContext';

interface Prop {
    plans: FloorPlan[];
}

const PlanList = ({ plans }: Prop) => {
    const { currentFloorPlan } = useContext(FloorPlanContext);
    const { floorPlanId } = useParams<string>();

    return (
        <div className="plan-list">
            <>
                {plans
                    .slice(0)
                    .reverse()
                    .map((plan, index) => {
                        return (
                            <Link
                                to={`/floor-plan/${plan.id}`}
                                key={`item-list-${index}`}
                            >
                                <div
                                    className={`item ${currentFloorPlan && currentFloorPlan.id && floorPlanId === plan.id ? 'active' : ''}`}
                                >
                                    <h5 className="plan-name">{plan.name}</h5>
                                    <div
                                        className="plan"
                                        style={{
                                            backgroundImage: `url(${plan.image.cropped})`
                                        }}
                                    ></div>
                                </div>
                            </Link>
                        );
                    })}
            </>

            <Link to={'/'}>
                <div className={`item ${floorPlanId ? '' : 'active'}`}>
                    <div className="new-plan">
                        <i className="las la-plus"></i>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PlanList;
