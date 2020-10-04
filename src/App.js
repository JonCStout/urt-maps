import React, { useState, useEffect, useRef } from 'react';
import { Stitch, AnonymousCredential } from 'mongodb-stitch-browser-sdk'; // package for connecting to our MongoDB-Realm app; Realm is the new name for Stitch but this package still works
import { Form, Input } from 'reactstrap'; // library for React controls
import MapCard from './MapCard';
import './App.css'; // style sheet for just this app component

export default function App() {
    const [isConnected, setIsConnected] = useState('is NOT connected');
    const mongoClient = useRef(); // for saving the mongoClient object across renders of this component;  *** may not need to save this if only used in one function
    // const mongoUser = useRef();  // *** not sure we need to save this
    const [maps, setMaps] = useState();
    const [searchInput, setSearchInput] = useState();

    useEffect(() => {
        setIsConnected('is connecting...');
        // initializeDefaultAppClient is really picky, only wants to be run once.  And saving the referenece to it is also picky
        mongoClient.current = Stitch.initializeDefaultAppClient('fsk-realmapp-slofx'); // string is app ID (realmApp)

        const creds = new AnonymousCredential();
        mongoClient.current.auth.loginWithCredential(creds).then((user) => {
            // *** user unneeded? ^
            setIsConnected('IS connected');
            // mongoUser.current = user;
            mongoClient.current.callFunction('getAllMapData').then((response) => {
                setMaps(response.result);
                console.log(response.result);
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // the empty array at the end means this hook only runs once, after the web page is done with the initial render

    function handleSearchChange(event) {
        setSearchInput(event.target.value);
        // todo:  parse input in real-time and generate tags?
    }

    // return is what renders the html of our component:
    return (
        <div className="App">
            <header className="App-header">
                <h1>URT MAPS - (database {isConnected})</h1>
            </header>
            <Form
                id="searchBar"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <Input
                    type="search"
                    name="search"
                    id="searchBox"
                    value={searchInput}
                    onChange={handleSearchChange}
                    placeholder="start typing map keywords here"
                />
            </Form>
            <div>Realtime test, showing your typed text: {searchInput}</div>
            <h2>Popular tags</h2>
            <div>list of tags here...</div>
            <br />
            <div id="cardList">
                {maps
                    ? maps.map((aMap) => (
                          <MapCard name={aMap._id} ss={aMap.screenShots} key={aMap._id} />
                      ))
                    : 'loading maps...'}
            </div>
        </div>
    );
}
