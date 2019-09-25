// https://github.com/firebase/firebase-functions/issues/220#issuecomment-379312738
// tslint:disable-next-line:no-import-side-effect
import 'firebase-functions';

import * as admin from 'firebase-admin';

admin.initializeApp();

export * from './http-functions';
