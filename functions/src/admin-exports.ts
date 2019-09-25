import {database, messaging} from 'firebase-admin';

export const adminDB = database();
export const adminMessaging = messaging();
