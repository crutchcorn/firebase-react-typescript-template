import {https} from 'firebase-functions';
import {ContextType} from './index';

interface IDeviceLocationData {
  childUID: string;
  childDeviceToken: string;
}

export const sayHi = https.onCall(async (data: IDeviceLocationData, context: ContextType) => {
  return {message: 'Hello'}
});
