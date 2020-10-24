import React from 'react';
import MainPage from './MainPage';
import MapDetailPage from './MapDetailPage';
import { CssBaseline } from '@material-ui/core';

export default function App() {
    // return is what renders the html (and jsx) of our component:
    return (
        <>
            <CssBaseline />
            <MainPage />
        </>
    );
}
