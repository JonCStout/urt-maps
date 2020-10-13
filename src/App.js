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
    const mongoClient = useRef(); // for saving the mongoClient object across renders of this component;  *** may not need to save this if only used in one function
    // const mongoUser = useRef();  // *** not sure we need to save this
    const [maps, setMaps] = useState(); // all the maps from the database, full object details per map
    const mapsWithTag_Map = useRef(new Map()); // mapsWithTag_Map is a Map that "maps" to the names of maps with that tag.  Sorry for confusing terms
    const [visibleTagsList, setVisibleTagsList] = useState([]);
    const [clickedTagsList, setClickedTagsList] = useState(new Set());
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
                setMaps(response.result);
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // the empty array at the end means this hook only runs once, after the web page is done with the initial render

    // when "maps" changes, this (re)-writes mapsWithTag_Map, and visibleTagsList
    useEffect(() => {
        if (maps) {
            maps.forEach((map) => {
                map.featureTags.forEach((tag) => {
                    let oldMapsList = mapsWithTag_Map.current.get(tag);
                    if (!oldMapsList) {
                        oldMapsList = [map._id]; // array with a string in it, not just a string alone
                    } else {
                        oldMapsList.push(map._id);
                    }

                    mapsWithTag_Map.current.set(tag, oldMapsList);
                });
            });

            makeVisibleTagsList(); // initial creation of visibleTagsList, all tags
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maps]);

    function makeVisibleTagsList() {
        if (!clickedTagsList || clickedTagsList.size < 1) {
            setVisibleTagsList([...mapsWithTag_Map.current.entries()]);
            return;
        }

        // let newList = new Map();
    }

    function handleMapFilterClick(tag) {
        let newTagsList = new Set(clickedTagsList); // shallow copy
        if (newTagsList.has(tag)) {
            newTagsList.delete(tag);
        } else {
            newTagsList.add(tag);
        }

        setClickedTagsList(newTagsList);
        setSearchInput([...newTagsList].toString()); // *** just for real-time testing

        // todo:  lots more handling here
    }

    function handleSearchChange(event) {
        setSearchInput(event.target.value);

        // todo:  parse input in real-time and generate tags
    }

    // return is what renders the html (and jsx) of our component:
    return (
        <>
            <CssBaseline />
            <header className='App-header'>
                <h1>
                    {isConnected === CONNECTED ? (
                        <Badge badgeContent={'database ' + isConnected} color='primary'>
                            URT MAPS
                        </Badge>
                    ) : (
                        <Badge badgeContent={'database ' + isConnected} color='error'>
                            URT MAPS
                        </Badge>
                    )}
                </h1>
            </header>
            <div id='searchBar'>
                <InputBase
                    placeholder='start typing map keywords here'
                    id='searchBox'
                    inputProps={{ 'aria-label': 'naked' }}
                    endAdornment={
                        <InputAdornment position='end'>
                            <Search />
                        </InputAdornment>
                    }
                    value={searchInput}
                    onChange={handleSearchChange}
                    fullWidth
                />
            </div>
            <div>
                Realtime test, showing your <em>typed text or clicked tag:</em>&nbsp; {searchInput.toString()}
            </div>
            <h2>
                <Badge badgeContent={visibleTagsList.length + ' visible'} color='primary'>
                    Map feature tags
                </Badge>
            </h2>
            <div style={{ paddingRight: '12px' }}>
                {/* ^ that padding prevents badges cutting off, or a horizontal scroll bar */}
                <TagsList
                    tagsArray={visibleTagsList}
                    clickedTagsList={clickedTagsList}
                    callBackFunc={handleMapFilterClick}
                />
            </div>
            <br />
            <div id='cardList'>
                {maps
                    ? maps.map((aMap) => <MapCard name={aMap._id} ss={aMap.screenShots} key={aMap._id} />)
                    : 'loading maps...'}
            </div>
        </>
    );
}
