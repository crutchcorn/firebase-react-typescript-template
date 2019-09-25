import React from "react";
import {ComponentRouteListItem} from "../components/AppHeaderNav";
import AppHeaderNav from "../components/AppHeaderNav";
import {Link, Route, Switch} from "react-router-dom";
import {Home} from "./public-pages/Home";

const routes: Array<ComponentRouteListItem> = [
    {
        name: "Home",
        url: "/",
        exact: true,
        comp: Home,
        id: 'home'
    }
];

export default function PublicView() {
    return <>
        <AppHeaderNav links={routes.map(({comp: _, ...route}) => route)} disableLogo={true}>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/login?register">
                <button>Register</button>
            </Link>
        </AppHeaderNav>
        <Switch>
            {
                routes.map(route =>
                    <Route
                        key={`${route.url}-${route.name}`}
                        exact={route.exact || false}
                        path={route.url}
                        component={route.comp}
                    />
                )
            }
        </Switch>
    </>
}
