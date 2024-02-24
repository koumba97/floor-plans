import { FloorPlan } from '../../../types/FloorPlan';
import './PlanList.scss';

interface Prop {
    plans: FloorPlan[];
}

const PlanList = ({ plans }: Prop) => {
    return (
        <div className="plan-list">
            <div className="item active">
                <div className="new-plan">
                    <i className="las la-plus"></i>
                </div>
            </div>

            <>
                {plans.map((plan, index) => {
                    return (
                        <div className="item" key={`item-list-${index}`}>
                            <div
                                className="new-plan"
                                style={{
                                    backgroundImage: `url(${plan.image.cropped})`
                                }}
                            >
                                {index}
                            </div>
                        </div>
                    );
                })}
            </>
        </div>
    );
};

export default PlanList;
