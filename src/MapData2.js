// import * as Realm from 'realm-web'; // mongodb realm package
import * as MapsJSON from './maps-db-2021-12-20.json'; // gets imported as a Module

class mapDB {
    //CONNECTED = 'IS connected'; // for db connection tracking
    //NOTCONNECTED = 'is NOT connected';
    //const [isConnected, setIsConnected] = useState(NOTCONNECTED);
    // const mongoApp = useRef([]); // for saving the mongoApp object across renders of this component;  *** may not need to save this if only used in one function one time?

    connected = false;

    //maps = useRef([]); // all the maps from the database, full object details per map
    maps = {
        current: [],
    };

    // this is where we connect to the database, and save it all into "maps"
    connect() {
        if (this.maps.current.length < 1) {
            console.log('connecting...');
            // mongoApp.current = new Realm.App({ id: 'urt-maps-realmapp-xjuqv' }); // string is app ID (realmApp, not realMapp)

            // const creds = new AnonymousCredential();
            try {
                // Authenticate the user
                // mongoApp.current.logIn(Realm.Credentials.anonymous()).then((returnedUser) => { ***
                // assert(mongoClient.id === mongoApp.currentUser.id);
                // returnedUser.functions.getAllMapData().then((response) => {
                // maps.current = response.result;
                this.maps.current = MapsJSON.default; // take the array from the Module and put it into the maps reference variable
                //setClickedTags_Set(new Set()); // initialize this Set and trigger Visibles updates
                //setIsConnected(CONNECTED);
                this.connected = true;
                // });
                // });
            } catch (err) {
                console.error('Failed to log in to db', err);
                //setIsConnected('DB ERROR');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    getAll() {
        return this.maps.current;
    }
}

export default new mapDB();
