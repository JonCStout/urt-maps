import React from 'react';
import MainPage from './MainPage';
import MapDetailPage from './MapDetailPage';
// import { CssBaseline } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route, Outlet } from 'react-router-dom';

//mapdb.connect();

export default function App() {
    //const MAINVIEW = 1;
    //const DETAILVIEW = 2;

    //const [viewState, setViewState] = useState(MAINVIEW);
    //const [detailMap, setDetailMap] = useState();
    //const [ssClickedIdx, setSSClickedIdx] = useState();

    /*
    function updateView(aMapObj, _ssClickedIdx) {
        setDetailMap(aMapObj);
        setSSClickedIdx(_ssClickedIdx);
        setViewState(DETAILVIEW);
    }
    */
    //maps = useRef(null);

    //const [status, updateStatus] = useState(null);

    //const [mapdata, updateMapdata] = useState(null);

    /*
    useEffect(() => {
        updateStatus(true);
        //maps = mapdb.getAll();
    }, []); // the empty array at the end means this hook only runs once, after the web page is done with the initial render
    */

    // return is what renders the html (and jsx) of our component:
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path='/map/:id' element={<MapDetailPage />} />
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
            <h3>Page Not found</h3>
        </div>
    );
}
