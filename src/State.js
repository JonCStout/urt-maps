import { useState, useRef } from 'react';

export default function State() {
    const CONNECTED = 'IS connected';
    const NOTCONNECTED = 'is NOT connected';
    const MAINVIEW = 1;

    const [isConnected, setIsConnected] = useState(NOTCONNECTED);
    const mongoClient = useRef([]); // for saving the mongoClient object across renders of this component;  *** may not need to save this if only used in one function
    // const mongoUser = useRef();  // *** not sure we need to save this
    const maps = useRef([]); // all the maps from the database, full object details per map
    const [visibleMaps, setVisibleMaps] = useState([]); // array of map objects
    const [visibleTags, setVisibleTags] = useState([]);
    const [clickedTags_Set, setClickedTags_Set] = useState(new Set());
    const [searchInput, setSearchInput] = useState(''); // complains about switching from uncontrolled to controlled input without an empty string to start
    const [viewState, setViewState] = useState(MAINVIEW);

    return {
        CONNECTED,
        NOTCONNECTED,
        MAINVIEW,
        isConnected,
        setIsConnected,
        mongoClient,
        maps,
        visibleMaps,
        setVisibleMaps,
        visibleTags,
        setVisibleTags,
        clickedTags_Set,
        setClickedTags_Set,
        searchInput,
        setSearchInput,
        viewState,
        setViewState,
    };
}
