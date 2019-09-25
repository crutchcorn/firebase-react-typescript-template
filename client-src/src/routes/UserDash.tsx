import React, {useMemo, useContext, useCallback, FC} from "react";
import AppHeaderNav from "../components/AppHeaderNav";
import {Route, RouteComponentProps, Switch, withRouter} from "react-router-dom";
import {ComponentRouteListItem} from "../components/AppHeaderNav";
import {AuthContext, filterRouteAllows, logout} from "../core/auth";
import {Home} from "./public-pages/Home";

const routes: Array<ComponentRouteListItem> = [
    {
        name: "Admin Page",
        url: "/",
        exact: true,
        comp: Home,
        allowRoles: ['admin'],
        id: "admin-page"
    }
];

const UserDash: FC<RouteComponentProps> = ({history}) => {
    const {user} = useContext(AuthContext);
    const usrRouteListItems = useMemo(
        () => filterRouteAllows((user && user.roles) || [], routes),
        [user]
    );

    const usrRoutes = useMemo(
        () => usrRouteListItems.map(({comp: _, ...route}) => route),
        [usrRouteListItems]
    );

    const onLogout = useCallback(
        () => void logout().then(() => void history.push("/")),
        [history]
    );

    return (
        <>
            <AppHeaderNav links={usrRoutes}>
                <button onClick={() => onLogout()}>
                    Log Out
                </button>
            </AppHeaderNav>
            <Switch>
                {usrRouteListItems.map(route => (
                    <Route
                        key={`${route.url}-${route.name}-${route.id}`}
                        exact={route.exact || false}
                        path={route.url}
                        component={route.comp}
                    />
                ))}
            </Switch>
        </>
    );
};

export default withRouter(UserDash);
