import firebase from "firebase";

export type AuthRoles = "user" | "admin";

export class User implements firebase.UserInfo {
    constructor(props: Partial<User> & {uid: string}) {
        this.uid = props.uid;
        if (props.displayName) this.displayName = props.displayName;
        if (props.email) this.email = props.email;
        if (props.providerId) this.providerId = props.providerId;
        if (props.phoneNumber) this.phoneNumber = props.phoneNumber;
        if (props.photoURL) this.photoURL = props.photoURL;
        if (props.roles) this.roles = props.roles;
    }

    // Can use the same role, but provide different experiences based on. Don't need city name, use geofence admin
    roles: ReadonlyArray<AuthRoles> = [];

    /**
     * FirebaseUser
     */
    displayName: string | null = null;
    email: string | null = null;
    phoneNumber: string | null = null;
    photoURL: string | null = null;
    providerId = '';
    /**
     * The user's unique ID.
     */
    uid: string;

    getValuesToSaveToFirebase() {
        const {
            displayName,
            email,
            phoneNumber,
            photoURL,
            providerId,
            getValuesToSaveToFirebase,
            ...props
        } = this;
        return props;
    }
}

export const getUserValuesFromFirebaseUser = (user: firebase.UserInfo) => {
    const {
        displayName,
        email,
        phoneNumber,
        photoURL,
        providerId,
        uid
    } = user;

    return {
        displayName,
        email,
        phoneNumber,
        photoURL,
        providerId,
        uid
    };
};

export type FirebaseUser = firebase.UserInfo;
