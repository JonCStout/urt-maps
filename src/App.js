import React, { useState } from 'react';
import MainPage from './MainPage';
import MapDetailPage from './MapDetailPage';
import { CssBaseline } from '@material-ui/core';

export default function App() {
    const MAINVIEW = 1;

    const [viewState, setViewState] = useState(MAINVIEW);
    const [detailMap, setDetailMap] = useState();
    const [ssFileName2, setssFileName2] = useState();

    function updateView(aMapObj, ssFileName) {
        setDetailMap(aMapObj);
        setssFileName2(ssFileName);
        setViewState(2);
    }

    // return is what renders the html (and jsx) of our component:
    return (
        <>
            <CssBaseline />
            {viewState === MAINVIEW ? (
                <MainPage updateViewCB={updateView} />
            ) : (
                <MapDetailPage map={detailMap} ssClicked={ssFileName2} />
            )}
        </>
    );
}
