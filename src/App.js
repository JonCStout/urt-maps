import React from 'react';
import MainPage from './MainPage';
import MapDetailPage from './MapDetailPage';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route, Outlet } from 'react-router-dom';

export default function App() {
    // return is what renders the html (and jsx) of our component:
    return (
        <Routes>
            <Route path='/urt-maps' element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path='/urt-maps/map/:id' element={<MapDetailPage />} />
                <Route path='*' element={<NoMatch />} />
            </Route>
        </Routes>
    );
}

function Layout() {
    return (
        <div>
            <CssBaseline />
            <Outlet />
        </div>
    );
}

function NoMatch() {
    return (
        <div>
            <h3>Page Not found (React Router error)</h3>
        </div>
    );
}
