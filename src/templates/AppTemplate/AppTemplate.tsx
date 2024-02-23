import './AppTemplate.scss';
import { Outlet } from 'react-router-dom';
import SideMenu from '../../components/SideMenu/SideMenu.tsx';
import { menuLinks } from '../../data/MenuLinkData.ts';
import NavBar from '../../components/NavBar/NavBar.tsx';
import Footer from '../../components/Footer/Footer.tsx';

const AppTemplate = () => {
    return (
        <div className="app-template">
            <SideMenu links={menuLinks} />
            <div className='template-content'>
                <NavBar />
                <div className='page'>
                    <Outlet />
                </div>
                <Footer/>
            </div>
        </div>
    );
};

export default AppTemplate;
