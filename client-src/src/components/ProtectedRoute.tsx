import {ComponentType} from "react";
import React, {useContext, useMemo} from "react";
import {Redirect, Route} from "react-router-dom";
import {AuthContext} from "../core/auth";

interface PrivateRouteProps {
    component: ComponentType;
    roles?: string[];
    fallbackComp?: ComponentType | null;
    [key: string]: any;
}

export default function PrivateRoute({
                                         component: Component,
                                         fallbackComp: FallbackComp = null,
                                         roles,
                                         ...rest
                                     }: PrivateRouteProps) {
    const {user} = useContext(AuthContext);

    const isAllowed = useMemo(() => {
        if (!user) {
            return false;
        }

        if (roles) {
            const isAllow = user.roles.some(usrRole =>
                roles.some(role => usrRole === role)
            );
            return isAllow;
        }

        return true;
    }, [roles, user]);

    return (
        <Route
            {...rest}
            render={props => {
                if (isAllowed) return <Component {...(props as any)} />;
                if (FallbackComp) return <FallbackComp/>;
                return <Redirect to="/login"/>
            }}
        />
    );
}
