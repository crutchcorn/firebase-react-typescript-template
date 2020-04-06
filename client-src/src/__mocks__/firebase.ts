import {FirebaseUser} from "../types/auth";

jest.mock('firebase/auth', () => ({}));
jest.mock('firebase/functions', () => ({}));
jest.mock('firebase/database', () => ({}));

type OnAuthCB = (usr: FirebaseUser | null) => void;
type OnAuthStateChangedType = (cb: OnAuthCB) => () => void;

jest.mock('firebase/app', () => {
    const noDashAtStartOrEnd = (str: string) => {
        if (str.startsWith('/')) str = str.slice(1, str.length);
        if (str.endsWith('/')) str = str.slice(0, str.length - 1);
        return str
    };

    const initializeApp = () =>  {
        // The UID of the newest user to avoid namespace collision and to provide a very basic unique UID system
        let uidNum = 0;
        const internalAuthData: {
            // Yes, we're not encrypting the password. PLEASE do not somehow use this in prod
            [uid: string]: FirebaseUser & {password: string};
        } = {};

        let authUID = 0;
        const _onAuthStateChangedCBs: OnAuthCB[][] = [];

            // This cannot be made a non `function` as `this` will no longer work
        const auth = () => {
            // Because there can be various `auth`, to avoid namespace collision we simply use a new index ID
            const authId = ++authUID;
            // Set the new value to an empty array to avoid issues
            _onAuthStateChangedCBs[authId] = [];
            return {
                onAuthStateChanged: ((cb) => {
                    // Add the CB to the on auth state changed
                    _onAuthStateChangedCBs[authUID].push(cb);
                    // Since we JUST pushed, we can be sure that length - 1 is the index of said callback
                    const index = _onAuthStateChangedCBs.length - 1;
                    // The unsubscribe fn will simply remove said CB from the array
                    return () => {
                        _onAuthStateChangedCBs[authId] = _onAuthStateChangedCBs[authId].filter((_, i) => i !== index);
                    }
                }) as OnAuthStateChangedType,
                // Async since the initial function returns a Promise
                createUserWithEmailAndPassword: async (email: string, password: string) => {
                    // Make sure the new user has a unique UID
                    const uid = `${++uidNum}`;
                    // Set the internal value to match `FirebaseUser` data + a password (to validate login attempts)
                    internalAuthData[uid] = {
                        password,
                        email,
                        uid,
                        displayName: `User ${uid}`,
                        phoneNumber: `${uid}`,
                        photoURL: uid,
                        providerId: ''
                    };
                    // The user is now logged in, let's run the auth state change CBs!
                    _onAuthStateChangedCBs[authId].forEach(cb => {
                        cb(internalAuthData[uid])
                    })
                    return internalAuthData[uid];
                },
                // Async since the initial function returns a Promise
                signInWithEmailAndPassword: async (email: string, password: string) => {
                    // The user should have the same email
                    const user = Object.values(internalAuthData).find((usrData) => usrData.email === email);
                    if (user) {
                        // If we found a user, see if the password validates
                        if (user.password === password) {
                            _onAuthStateChangedCBs[authId].forEach(cb => {
                                cb(user)
                            });
                            return {user};
                        } else {
                            throw new Error('Wrong password');
                        }
                    }
                    if (!user) {
                        throw new Error('There is no user with that email');
                    }
                },
                signOut: () => {
                    _onAuthStateChangedCBs[authId].forEach(cb => cb(null));
                }
            }
        };

        auth().createUserWithEmailAndPassword('works@example.com', 'shouldwork').then((usr) => {
            console.log("Test user created: ", usr);
        });

        // Instead of breaking into proper `/` delimited data structure, we're just gonna use a Map and normalize aggressively
        const internalDBData = new Map();
        const database = ({path: propPath = ''}: {path?: string} = {}) => {
            return {
                _path: propPath,
                ref: () => database(),
                child: (childPath: string) => {
                    // We may need to compose these `child` calls, so we use `propPath` and `childPath`
                    // Remove potential for double-dash in our map
                    let prependPath = noDashAtStartOrEnd(propPath);
                    // However, we don't want to add a `/` if there is no value, so we check
                    if (prependPath.length) prependPath = prependPath + '/';
                    // Remove potential for double-dash in our map again, just in case
                    const normalizedChildPath = noDashAtStartOrEnd(childPath);
                    return database({path: `${prependPath}${normalizedChildPath}`});
                },
                // Treat our path as the key to a map
                set: (data: any) => {
                    internalDBData.set(propPath, data)
                },
                /**
                 * This is async since the original API returns a promise
                 * @param str
                 *  This will likely need further type additions, but I'll add them as they come
                 */
                once: async (str: 'value') => {
                    if (str === 'value') return {
                        val: () => internalDBData.get(propPath)
                    }
                }
            }
        };
        const functions = () => {
            return {
                httpsCallable: () => {}
            }
        };
        return {
            auth,
            database,
            functions
        }
    };

    return {
        initializeApp
    }
});
