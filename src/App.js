import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // style sheet for just the app component
import { Stitch, AnonymousCredential } from 'mongodb-stitch-browser-sdk'; // package for connecting to our MongoDB-Realm app; Realm is the new name for Stitch but this package still works

function App() {
    const [isConnected, setIsConnected] = useState('is NOT connected');
    const mongoClient = useRef(); // for saving the mongoClient object across renders of this component

    useEffect(() => {
        setIsConnected('is connecting...');
        // initializeDefaultAppClient is really picky, only wants to be run once.  And saving the referenece to it is also picky
        mongoClient.current = Stitch.initializeDefaultAppClient('fsk-realmapp-slofx'); // string is app ID (realmApp)

        const creds = new AnonymousCredential();
        mongoClient.current.auth.loginWithCredential(creds).then(() => {
            setIsConnected('IS connected');
            getAllRecords();
        });
    }, []); // the empty array at the end means this hook only runs once, after the web page is done with the initial render

    function getAllRecords() {
        if (mongoClient.current.auth.isLoggedIn) console.log('connected to db...');
        console.log(mongoClient);
    }

    // return is what renders the html of our component:
    return (
        <div className="App">
            <header className="App-header">
                {/* <h1>
                    <div id="auth-status">Not logged in yet...</div>
                </h1> */}
                <h2>database {isConnected}</h2>
            </header>
        </div>
    );
}

export default App;
