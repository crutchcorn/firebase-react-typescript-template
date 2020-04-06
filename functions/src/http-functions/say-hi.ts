import {https} from 'firebase-functions';
import {ContextType} from './index';

interface SayHiData {
  messageToSay: string;
}

export const sayHi = https.onCall(async (data: SayHiData, context: ContextType) => {
  return {message: 'Hello'}
});
