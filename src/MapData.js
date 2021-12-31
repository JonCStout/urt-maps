import React, { useState, useRef } from 'react';
// import * as Realm from 'realm-web'; // mongodb realm package
import * as MapsJSON from './maps-db-2021-12-20.json'; // gets imported as a Module
import { Badge, InputAdornment, InputBase } from '@material-ui/core'; // reset CSS properties across browsers to a baseline, and controls

export default function MapData() {
    CONNECTED = 'IS connected'; // for db connection tracking
    NOTCONNECTED = 'is NOT connected';
    const [isConnected, setIsConnected] = useState(NOTCONNECTED);
    // const mongoApp = useRef([]); // for saving the mongoApp object across renders of this component;  *** may not need to save this if only used in one function one time?

    maps = useRef([]); // all the maps from the database, full object details per map

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
    }, []);

    return(
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
    );

}
