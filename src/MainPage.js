import React, { useEffect, useState, useRef } from 'react';
import mapdb from './MapData2';
import * as Realm from 'realm-web'; // mongodb realm package
import MapCard from './MapCard';
import TagsList from './TagsList';
import './MainPage.css'; // style sheet for just this app component
import { Badge, InputAdornment, InputBase } from '@material-ui/core'; // reset CSS properties across browsers to a baseline, and controls
import { Search } from '@material-ui/icons';
import { BrowserRouter as Router } from 'react-router-dom';

export default function MainPage() {
    const [visibleMaps, setVisibleMaps] = useState([]); // array of map objects
    const [visibleTags, setVisibleTags] = useState([]);
    const [clickedTags_Set, setClickedTags_Set] = useState(new Set());
    const [searchInput, setSearchInput] = useState(''); // complains about switching from uncontrolled to controlled input without an empty string to start

    const maps = useRef([]);

    useEffect(() => {
        maps.current = mapdb.getAll();
    }, []);
    maps.current = MapsJSON.default; // take the array from the imported Module and put it into the maps reference variable, to start

    /**
    // this is where we (unconditionally try to) connect to the database, and save it all into "maps"
    useEffect(() => {
        // if (maps.current.length < 1) {
        setIsConnected('is connecting...');
        mongoApp.current = new Realm.App({ id: 'urt-maps-realmapp-xjuqv' }); // string is app ID (realmApp, not realMapp)

        try {
            mongoApp.current.logIn(Realm.Credentials.anonymous()).then((returnedUser) => {
                // ^ login to db with anonymous credentials
                returnedUser.functions.getAllMapData().then((response) => {
                    // ^ getAllMapData is a function on the mongodb/Realm provider, see RealmFuncs.txt
                    maps.current = response.result; // grab the entire db result and directly pipe it into our maps ref variable
                    setClickedTags_Set(new Set()); // initialize this Set and trigger Visibles updates
                    setIsConnected(CONNECTED);
                });
            });
        } catch (err) {
            console.error('Failed to log in to db', err);
            setIsConnected('ERROR');
        }
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // the empty array at the end means this hook only runs once, after the web page is done with the initial render

     */

    // this hook updates visibleMaps & visibleTags when clickedTags_Set changes
    useEffect(() => {
        let newVisibleMaps = [];

        // update visibleMaps based on what tags are clicked
        if (!clickedTags_Set || clickedTags_Set.size < 1) {
            if (maps.current) newVisibleMaps = maps.current; // all maps visible, if maps have loaded
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
        //updateViewCB(aMap, ssFileName);
    }

    return (
        <>
            <header className='App-header'>
                <h1>
                    <Badge
                        badgeContent={
                            'db ' +
                            (mapdb.connected ? 'connected' : 'not connected') +
                            ' | ' +
                            (visibleMaps ? visibleMaps.length : '0') +
                            (visibleMaps && visibleMaps.length === 1 ? ' map visible' : ' maps visible')
                        }
                        color={mapdb.connected ? 'secondary' : 'error'}
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
                    ? visibleMaps.map((aMap) => <MapCard map={aMap} key={aMap._id} />)
                    : 'loading maps...'}
            </div>
        </>
    );
}
