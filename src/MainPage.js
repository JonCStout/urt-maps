import React, { useEffect, useState, useRef } from 'react';
// import * as Realm from 'realm-web'; // mongodb realm package
import MapCard from './MapCard';
import TagsList from './TagsList';
import './MainPage.css'; // style sheet for just this app component
import { Badge, InputAdornment, InputBase } from '@material-ui/core'; // reset CSS properties across browsers to a baseline, and controls
import { Search } from '@material-ui/icons';
import * as MapsJSON from './maps-db-2021-12-20.json'; // gets imported as a Module

export default function MainPage({ updateViewCB }) {
    const CONNECTED = 'IS connected'; // for db connection tracking
    const NOTCONNECTED = 'is NOT connected';
    const [isConnected, setIsConnected] = useState(NOTCONNECTED);
    // const mongoApp = useRef([]); // for saving the mongoApp object across renders of this component;  *** may not need to save this if only used in one function one time?

    const maps = useRef([]); // all the maps from the database, full object details per map
    const [visibleMaps, setVisibleMaps] = useState([]); // array of map objects
    const [visibleTags, setVisibleTags] = useState([]);
    const [clickedTags_Set, setClickedTags_Set] = useState(new Set());
    const [searchInput, setSearchInput] = useState(''); // complains about switching from uncontrolled to controlled input without an empty string to start

    // console.log(MapsJSON);
    // this is where we connect to the database, and save it all into "maps"
    useEffect(() => {
        if (maps.current.length < 1) {
            setIsConnected('is connecting...');
            // mongoApp.current = new Realm.App({ id: 'urt-maps-realmapp-xjuqv' }); // string is app ID (realmApp, not realMapp)

            // const creds = new AnonymousCredential();
            try {
                // Authenticate the user
                // mongoApp.current.logIn(Realm.Credentials.anonymous()).then((returnedUser) => { ***
                // assert(mongoClient.id === mongoApp.currentUser.id);
                // returnedUser.functions.getAllMapData().then((response) => {
                // maps.current = response.result;
                maps.current = MapsJSON.default; // take the array from the Module and put it into the maps reference variable
                setClickedTags_Set(new Set()); // initialize this Set and trigger Visibles updates
                setIsConnected(CONNECTED);
                // });
                // });
            } catch (err) {
                console.error('Failed to log in to db', err);
                setIsConnected('DB ERROR');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // the empty array at the end means this hook only runs once, after the web page is done with the initial render

    // this hook updates visibleMaps & visibleTags when clickedTags_Set changes
    useEffect(() => {
        let newVisibleMaps = [];

        // update visibleMaps based on what tags are clicked
        if (!clickedTags_Set || clickedTags_Set.size < 1) {
            if (maps && maps.current) newVisibleMaps = maps.current; // all maps visible, if maps have loaded
        } else {
            newVisibleMaps = maps.current.filter((singleMap) => {
                let include = true;
                clickedTags_Set.forEach((tag) => {
                    include &= singleMap.featureTags.includes(tag); // a map must have every clicked tag to be included
                });
                return include ? singleMap : null;
            });
        }
        newVisibleMaps.sort((a, b) => {
            if (a._id < b._id) return -1;
            if (a._id > b._id) return 1;
            return 0;
        });
        setVisibleMaps(newVisibleMaps);

        // update visibleTags based on visibleMaps (reusing newVisibleMaps above, not waiting for async set)
        let newVisibleTags = new Map();
        newVisibleMaps.forEach((singleMap) => {
            singleMap.featureTags.forEach((tag) => {
                // for each tag in each map
                let count = newVisibleTags.get(tag); // if a tag exists, get its count
                if (!count) count = 1;
                else count += 1;
                newVisibleTags.set(tag, count); // add pair to Map... tag: count
            });
        });
        setVisibleTags(
            [...newVisibleTags].sort((a, b) => {
                // if (a[1] > b[1]) return -1; // descending by count ([1])
                // if (a[1] < b[1]) return 1;
                if (a[0] > b[0]) return 1; // when tied, ascending by tag name ([0])
                if (a[0] < b[0]) return -1;
                return 0; // this should never be reached due to unique tag names, but just in case
            })
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clickedTags_Set]);

    function handleMapFilterClick(tag) {
        let newTagsList = new Set(clickedTags_Set); // shallow copy
        if (newTagsList.has(tag)) {
            newTagsList.delete(tag);
        } else {
            newTagsList.add(tag);
        }

        setClickedTags_Set(newTagsList);
        setSearchInput([...newTagsList].toString()); // *** just for real-time testing
    }

    function handleSearchChange(event) {
        setSearchInput(event.target.value);

        // todo:  parse input in real-time and update clicked tags, visibles
    }

    function handleCardClick(aMap, ssFileName) {
        // window.location.assign('ss/' + mapName + '/' + ssFileName);
        updateViewCB(aMap, ssFileName);
    }

    return (
        <>
            <header className='App-header'>
                <h1>
                    <Badge
                        badgeContent={
                            'db ' +
                            isConnected +
                            ' | ' +
                            (visibleMaps ? visibleMaps.length : '0') +
                            (visibleMaps && visibleMaps.length === 1 ? ' map visible' : ' maps visible')
                        }
                        color={isConnected === CONNECTED ? 'secondary' : 'error'}
                    >
                        URT MAP FINDER
                    </Badge>
                </h1>
            </header>
            <div id='search-bar'>
                <InputBase
                    placeholder='start typing map keywords here, separated by commas'
                    id='search-box'
                    inputProps={{ 'aria-label': 'naked' }}
                    startAdornment={
                        <InputAdornment position='start'>
                            <Search />
                        </InputAdornment>
                    }
                    value={searchInput}
                    onChange={handleSearchChange}
                    fullWidth
                />
            </div>
            <div style={{ paddingLeft: '.5em' }}>
                Realtime test, showing your <em>typed text or clicked tag:</em>
                &nbsp; {searchInput.toString()}
            </div>
            <h2 style={{ paddingLeft: '1rem' }}>
                <Badge badgeContent={visibleTags.length + ' visible'} color='secondary'>
                    Map feature tags
                </Badge>
            </h2>
            <TagsList
                visibleTagsList={visibleTags}
                clickedTagsList={clickedTags_Set}
                callBackFunc={handleMapFilterClick}
            />
            <br />
            <div id='card-list'>
                {visibleMaps.length > 0
                    ? visibleMaps.map((aMap) => <MapCard map={aMap} cb={handleCardClick} key={aMap._id} />)
                    : 'loading maps...'}
            </div>
        </>
    );
}
