import './App.css';
import { Route, Routes } from 'react-router-dom';
import AppTemplate from './templates/AppTemplate';

function App() {
    return (
        <Routes>
            <Route path="/" element={<AppTemplate />}>
                <Route index element={<>App content</>} />
            </Route>
        </Routes>
    );
}

export default App;
