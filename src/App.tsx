import './App.css';
import { Route, Routes } from 'react-router-dom';
import AppTemplate from './templates/AppTemplate/AppTemplate';
import AddingFloorPlans from './pages/AddingFloorPlans';

function App() {
    return (
        <Routes>
            <Route path="/" element={<AppTemplate />}>
                <Route index element={<AddingFloorPlans/>} />
            </Route>
        </Routes>
    );
}

export default App;
