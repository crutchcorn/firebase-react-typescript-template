import {Component, createContext} from "react";
import {AuthRoles, User, FirebaseUser, getUserValuesFromFirebaseUser} from "../types/auth";
import { firebaseAuth, firebaseDb } from "./firebase";
import { ComponentRouteListItem } from "../components/AppHeaderNav";

interface AuthContext {
  user: User | null;
  changeUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  changeUser: () => {}
});

export const userState = {
  user: null,
  changeUser
};

function changeUser(this: Component, user: User) {
  this.setState({
    user
  });
}

export async function createUser(
    email: string,
    password: string,
    roles: ReadonlyArray<AuthRoles>,
    firebaseAuthRoot = firebaseAuth
): Promise<User> {
  const { user } = await firebaseAuthRoot.createUserWithEmailAndPassword(
      email,
      password
  );

  const newUsr = new User({
    ...getUserValuesFromFirebaseUser(user!),
    roles
  }) as any;

  await firebaseDb
      .ref()
      .child(`users/${user!.uid}`)
      .set(newUsr.getValuesToSaveToFirebase());
  return newUsr;
}

export async function loginUser(email: string, password: string) {
  const { user } = await firebaseAuth.signInWithEmailAndPassword(
      email,
      password
  );
  return getUsrData(user!);
}

export function logout() {
  return firebaseAuth.signOut();
}

export async function getUsrData(user: FirebaseUser): Promise<User> {
  const userInstance = await firebaseDb
      .ref()
      .child(`users/${user.uid}`)
      .once("value");

  let usrData = userInstance.val();

  // If somehow the user does not have data already saved to their `users` bucket
  if (!usrData) {
    usrData = new User({
      ...getUserValuesFromFirebaseUser(user),
      roles: ["user"]
    });
    if (user.displayName) {
      usrData.firstName = user.displayName.split(/\s/)[0];
    }
    if (user.email) {
      usrData.email = user.email;
    }
    await firebaseDb
        .ref()
        .child(`users/${user.uid}`)
        .set(usrData.getValuesToSaveToFirebase());
  }

  return usrData;
}

export function filterRouteAllows(
    usrRoles: ReadonlyArray<AuthRoles>,
    routes: ComponentRouteListItem[]
) {
  if (!usrRoles) {
    return [];
  }
  if (usrRoles.includes("admin")) {
    return routes;
  }
  return routes.filter(
      route =>
          !route.allowRoles ||
          route.allowRoles.some(allowRole => usrRoles.includes(allowRole))
  );
}
