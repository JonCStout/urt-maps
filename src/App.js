import React from 'react';
import './App.css'; // style sheet for just the app component
import { Stitch, AnonymousCredential } from 'mongodb-stitch-browser-sdk'; // package for connecting to our MongoDB-Realm app; Realm is the new name for Stitch but this package still works

// function taken from mongodb-stitch-browser-sdk quick start, with our app id:
function initializeAndLogin() {
    const client = Stitch.initializeDefaultAppClient('fsk-realmapp-slofx');
    client.auth.loginWithCredential(new AnonymousCredential()).then((user) => {
        document.getElementById(
            'auth-status'
        ).innerHTML = `Logged in as anonymous user with id ${user.id}`;
    });
}

window.onload = initializeAndLogin; // call our function above once the web page has finished its first full render

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    <div id="auth-status">Not logged in yet...</div>
                </h1>
            </header>
        </div>
    );
}

export default App;
