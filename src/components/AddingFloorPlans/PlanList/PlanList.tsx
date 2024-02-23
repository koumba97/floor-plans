import './PlanList.scss';

interface Prop {
    list: [];
}

const PlanList = () => {
    return (
        <div className="plan-list">
            <div className="item active">
                <div className="new-plan">
                    <i className="las la-plus"></i>
                </div>
            </div>
        </div>
    );
};

export default PlanList;
