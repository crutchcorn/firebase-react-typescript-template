import React, {useEffect, useState, useCallback, FC} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {AuthContext, getUsrData} from "./core/auth";
import PrivateRoute from "./components/ProtectedRoute";
import PublicView from "./routes/PublicView";
import Login from "./routes/Login";
import UserDash from "./routes/UserDash";
import ErrorBoundary from "./components/ErrorBoundary";
import {firebaseAuth} from "./core/firebase";
import {User} from "./types/auth";

export const App: FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const changeUser = useCallback((user) => {
    if (user && user.roles && user.roles.length !== 0) {
      setUser(new User(user))
    } else {
      setUser(user);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(usr => {
      // If the user logged in and isn't in state
      if (usr && !user) {
        getUsrData(usr)
          .then(usrData => changeUser(usrData))
          .catch(err => console.error(err));
        // User explicitly logged out
      } else if (!usr) {
        changeUser(null);
      }
    });
    return () => unsubscribe();
  }, [user, changeUser]);

  return (
    <ErrorBoundary>
      <AuthContext.Provider value={{
        user,
        changeUser
      }}>
          <Router>
            <Switch>
              <Route path="/login" exact component={Login}/>
              <PrivateRoute path="/" component={UserDash} fallbackComp={PublicView}/>
            </Switch>
          </Router>
      </AuthContext.Provider>
    </ErrorBoundary>
  );
};
