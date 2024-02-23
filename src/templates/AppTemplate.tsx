import { Outlet } from 'react-router-dom';
import SideMenu from '../components/SideMenu/SideMenu.tsx';
import { menuLinks } from '../data/MenuLinkData.ts';

const AppTemplate = () => {
    return (
        <div className="app">
            <SideMenu links={menuLinks} />
            <div className="page-content">
                <div>Navbar here</div>
                <Outlet />
            </div>
        </div>
    );
};

export default AppTemplate;
