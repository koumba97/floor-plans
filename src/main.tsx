import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { FloorPlanProvider } from './contexts/FloorPlanContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <FloorPlanProvider>
                <App />
            </FloorPlanProvider>
        </BrowserRouter>
    </React.StrictMode>
);
