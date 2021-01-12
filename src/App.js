import React, { useState } from 'react';
import MainPage from './MainPage';
import MapDetailPage from './MapDetailPage';
import { CssBaseline } from '@material-ui/core';

export default function App() {
    const MAINVIEW = 1;
    const DETAILVIEW = 2;

    const [viewState, setViewState] = useState(MAINVIEW);
    const [detailMap, setDetailMap] = useState();
    const [ssClickedIdx, setSSClickedIdx] = useState();

    function updateView(aMapObj, _ssClickedIdx) {
        setDetailMap(aMapObj);
        setSSClickedIdx(_ssClickedIdx);
        setViewState(DETAILVIEW);
    }

    // return is what renders the html (and jsx) of our component:
    return (
        <>
            <CssBaseline />
            {viewState === MAINVIEW ? (
                <MainPage updateViewCB={updateView} />
            ) : (
                <MapDetailPage map={detailMap} ssClicked={ssClickedIdx} />
            )}
        </>
    );
}
