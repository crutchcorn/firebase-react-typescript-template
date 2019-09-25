import {firebaseFunc} from "../core/firebase";

export const sayHi = async () => {
  const firebaseNamedFunc = firebaseFunc.httpsCallable('sayHi');
  return await firebaseNamedFunc();
};
