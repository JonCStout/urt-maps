import * as Realm from 'realm-web'; // mongodb realm package
import * as MapsJSON from './maps-db-2021-12-20.json'; // gets imported as a Module

class mapDB {
    static connected = false;
    static dbapp = null;
    static dbuser = null;
    static preloaded = MapsJSON.default; // use local json file as preloaded data

    static maps = {
        current: [], // the 'current' property here is intended to mirror the react 'useref' structure for convenience
    };

    // connect to the database
    static connect() {
        let me = this; // save a reference to this, since it becomes undefined within the Promise context (todo: there's a better way to do this, maybe by pre-binding this to the promise?)
        return new Promise((onSuccess, onError) => {
            if (me.dbapp == null) {
                // console.log('connecting...');
                me.dbapp = new Realm.App({ id: 'urt-maps-realmapp-xjuqv' }); // string is app ID (realmApp, not realMapp)

                try {
                    me.dbapp.logIn(Realm.Credentials.anonymous()).then(
                        (returnedUser) => {
                            me.dbuser = returnedUser;
                            me.connected = true;
                            onSuccess();
                        },
                        () => {
                            onError();
                        }
                    );
                } catch (err) {
                    console.error('Failed to log in to db', err);
                    onError();
                }
            } else {
                // already connected
                onSuccess();
            }
        });
    }

    static getAll() {
        const me = this;
        return new Promise((onSuccess, onError) => {
            if (me.maps.current.length > 0) {
                onSuccess(me.maps.current);
            } else {
                me.dbuser.functions.getAllMapData().then(
                    (response) => {
                        me.maps.current = response.result;
                        onSuccess(response.result);
                    },
                    () => {
                        onError();
                    }
                );
            }
        });
    }

    static get(id) {
        const me = this;

        function findMap(id) {
            let map = me.maps.current.filter((map) => id === map._id.replace(/_/g, ' '));
            return map.length ? map.pop() : false;
        }

        return new Promise((onSuccess, onError) => {
            if (me.maps.current.length > 0) {
                let map = findMap(id);
                map ? onSuccess(map) : onError('Unable to find requested map');
            } else {
                me.dbuser.functions.getAllMapData().then(
                    (response) => {
                        me.maps.current = response.result;
                        let map = findMap(id);
                        map ? onSuccess(map) : onError('Unable to find requested map');
                    },
                    () => {
                        onError('Error querying database');
                    }
                );
            }
        });
    }
}

export default mapDB;
