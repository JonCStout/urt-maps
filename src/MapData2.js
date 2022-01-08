// import * as Realm from 'realm-web'; // mongodb realm package
import * as MapsJSON from './maps-db-2021-12-20.json'; // gets imported as a Module

class mapDB {
    //CONNECTED = 'IS connected'; // for db connection tracking
    //NOTCONNECTED = 'is NOT connected';
    //const [isConnected, setIsConnected] = useState(NOTCONNECTED);
    // const mongoApp = useRef([]); // for saving the mongoApp object across renders of this component;  *** may not need to save this if only used in one function one time?

    static connected = false;

    //maps = useRef([]); // all the maps from the database, full object details per map
    static maps = {
        current: [],
    };

    // this is where we connect to the database, and save it all into "maps"
    static connect() {
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

    static getAll() {
        if (this.maps.current.length > 0) {
            return this.maps.current;
        } else {
            console.error('No maps to return');
            return false;
        }
    }

    static get(id) {
        if (this.maps.current.length > 0) {
            return this.maps.current.filter((map) => id == map._id.replace(/_/g, ' ')).pop();
        } else {
            console.error('No maps to return');
            return false;
        }
    }
}

export default mapDB;
