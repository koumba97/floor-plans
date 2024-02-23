import './App.css';
import SideMenu from './components/SideMenu/SideMenu';
import { menuLinks } from './data/MenuLinkData';

function App() {
    return (
        <div>
            <SideMenu links={menuLinks} />
        </div>
    );
}

export default App;
