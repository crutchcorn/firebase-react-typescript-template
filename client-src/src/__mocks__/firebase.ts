// @ts-ignore
import * as firebase from "firebase";

jest.mock('firebase/auth', () => ({}));
jest.mock('firebase/functions', () => ({}));
jest.mock('firebase/database', () => ({}));

jest.mock('firebase/app', () => {
    const firebaseMock = require('firebase-mock');

    const mockDatabase = new firebaseMock.MockFirebase();
    const mockAuth = new firebaseMock.MockFirebase();
    const mockSDK = new firebaseMock.MockFirebaseSdk((path: any) => {
        return path ? mockDatabase.child(path) : mockDatabase;
    }, () => {
        return mockAuth;
    });

    const firebaseApp = mockSDK.initializeApp();

    return {
        ...mockSDK,
        initializeApp: () => ({
            ...firebaseApp,
            functions: () => {}
        })
    };
});
