import './SideMenu.scss';

interface Props {
    links: {
        icon: string;
        route: string;
    }[];
}
const SideMenu = ({ links }: Props) => {
    return (
        <div className="side-menu">
            <div className="list">
                {links.map((link, index) => {
                    return (
                        <a href={link.route} key={index}>
                            <i className={link.icon}></i>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default SideMenu;
