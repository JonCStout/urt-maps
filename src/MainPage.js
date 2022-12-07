import React, { useEffect, useState, useRef } from 'react';
import mapdb from './mapData';
import MapCard from './MapCard';
import TagsList from './TagsList';
import './MainPage.css'; // style sheet for just this app component
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import { Search } from '@mui/icons-material';

export default function MainPage() {
    const [visibleMaps, setVisibleMaps] = useState([]); // array of game map objects
    const [visibleTags, setVisibleTags] = useState([]); // (sorted) array of tag strings
    const [clickedTags_Set, setClickedTags_Set] = useState(new Set()); // a Set of clicked tag strings
    const [searchInput, setSearchInput] = useState(''); // complains about switching from uncontrolled to controlled input without an empty string to start

    const maps = useRef(mapdb.preloaded); // take the array from the imported Module and put it into the maps reference variable, to start

    useEffect(() => {
        document.title = 'UrT Map Finder Repo';
        mapdb.connect().then(() => {
            mapdb.getAll().then((dbresult) => {
                maps.current = dbresult;
                setClickedTags_Set(new Set()); // initialize this Set and trigger Visibles updates
            });
        }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // the empty array at the end means this hook only runs once, after the web page is done with the initial render

    // this hook updates visibleMaps & visibleTags when clickedTags_Set changes
    useEffect(() => {
        let newVisibleMaps = [];

        // update visibleMaps based on what tags are clicked
        if (!clickedTags_Set || clickedTags_Set.size < 1) {
            if (maps.current) newVisibleMaps = maps.current; // all maps visible, if maps have loaded
        } else {
            newVisibleMaps = maps.current.filter((singleMap) => {
                let include = true; // this variable resets with each iteration
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
        setVisibleMaps(newVisibleMaps); // any set() from useState like this one is async, not immediate

        // update visibleTags based on newVisibleMaps, not waiting for setVisibleMaps()
        let newVisibleTags = new Map();
        newVisibleMaps.forEach((singleMap) => {
            singleMap.featureTags.forEach((tag) => {
                // for each tag in each game map
                let count = newVisibleTags.get(tag); // if a tag exists, get its count
                if (!count) count = 1;
                else count += 1;
                newVisibleTags.set(tag, count); // add key/val pair to this Map... tag: count
            });
        });
        setVisibleTags(
            [...newVisibleTags].sort((a, b) => {
                // destructured the Map to use Array.sort()
                // if (a[1] > b[1]) return -1; // descending by "count" aka [1]
                // if (a[1] < b[1]) return 1;
                // if the above 2 haven't returned yet, then there was a tie, so next sort criteria:
                if (a[0] > b[0]) return 1; // ascending by "tag" aka [0]
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
