import React, { useState, useEffect, useRef } from 'react';
import { Stitch, AnonymousCredential } from 'mongodb-stitch-browser-sdk'; // package for connecting to our MongoDB-Realm app; Realm is the new name for Stitch but this package still works
import MapCard from './MapCard';
import TagsList from './TagsList';
import './App.css'; // style sheet for just this app component
import { Badge, CssBaseline, InputAdornment, InputBase } from '@material-ui/core'; // reset CSS properties across browsers to a baseline, and controls
import { Search } from '@material-ui/icons';

export default function App() {
    const CONNECTED = 'IS connected';
    const NOTCONNECTED = 'is NOT connected';
    const [isConnected, setIsConnected] = useState(NOTCONNECTED);
    const mongoClient = useRef([]); // for saving the mongoClient object across renders of this component;  *** may not need to save this if only used in one function
    // const mongoUser = useRef();  // *** not sure we need to save this
    const maps = useRef([]); // all the maps from the database, full object details per map
    const [visibleMaps, setVisibleMaps] = useState([]); // array of map objects
    const [visibleTags, setVisibleTags] = useState([]);
    const [clickedTags_Set, setClickedTags_Set] = useState(new Set());
    const [searchInput, setSearchInput] = useState(''); // complains about switching from uncontrolled to controlled input without an empty string to start

    // this is where we connect to the database, and save it all into "maps"
    useEffect(() => {
        setIsConnected('is connecting...');
        // initializeDefaultAppClient is really picky, only wants to be run once.  And saving the referenece to it is also picky
        mongoClient.current = Stitch.initializeDefaultAppClient('fsk-realmapp-slofx'); // string is app ID (realmApp, not realMapp)

        const creds = new AnonymousCredential();
        mongoClient.current.auth.loginWithCredential(creds).then((user) => {
            // *** user unneeded? ^
            setIsConnected(CONNECTED);
            // mongoUser.current = user;
            mongoClient.current.callFunction('getAllMapData').then((response) => {
                maps.current = response.result;
                setClickedTags_Set(new Set()); // initialize this Set and trigger Visibles updates
            });
        });
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

    // return is what renders the html (and jsx) of our component:
    return (
        <>
            <CssBaseline />
            <header className='App-header'>
                <h1>
                    <Badge
                        badgeContent={
                            'database ' +
                            isConnected +
                            ' | ' +
                            (visibleMaps ? visibleMaps.length : '0') +
                            (visibleMaps && visibleMaps.length === 1 ? ' map visible' : ' maps visible')
                        }
                        color={isConnected === CONNECTED ? 'secondary' : 'error'}
                    >
                        URT MAPS
                    </Badge>
                </h1>
            </header>
            <div id='searchBar'>
                <InputBase
                    placeholder='start typing map keywords here, separated by commas'
                    id='searchBox'
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
            <div>
                Realtime test, showing your <em>typed text or clicked tag:</em>
                &nbsp; {searchInput.toString()}
            </div>
            <h2>
                <Badge badgeContent={visibleTags.length + ' visible'} color='secondary'>
                    Map feature tags
                </Badge>
            </h2>
            <div style={{ paddingRight: '12px' }}>
                {/* ^ that padding prevents badges cutting off, or a horizontal scroll bar */}
                <TagsList
                    visibleTagsList={visibleTags}
                    clickedTagsList={clickedTags_Set}
                    callBackFunc={handleMapFilterClick}
                />
            </div>
            <br />
            <div id='cardList'>
                {visibleMaps
                    ? visibleMaps.map((aMap) => <MapCard name={aMap._id} ss={aMap.screenShots} key={aMap._id} />)
                    : 'loading maps...'}
            </div>
        </>
    );
}
