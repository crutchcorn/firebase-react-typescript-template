import {https} from 'firebase-functions';

export type ContextType = Parameters<Parameters<typeof https.onCall>[0]>[1];

export * from './say-hi';
