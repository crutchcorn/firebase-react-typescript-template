import {ComponentType, FC} from "react";
import React from "react";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {AuthRoles} from "../types/auth";

export type RouteType = {
  name: string;
  url: string;
  allowRoles?: Array<AuthRoles>;
  exact?: boolean;
  id: string;
};

export type ComponentRouteListItem = RouteType & {
  comp: ComponentType;
};

interface AppHeaderNavProps {
  disableLogo?: boolean;
  links: RouteType[];
}
const AppHeaderNav: FC<RouteComponentProps & AppHeaderNavProps> = ({links, children, location, disableLogo = false}) => {
  return <div>
    <nav>
      {!disableLogo && <img src="/logo.png" alt="Project Logo"/>}
      <div>
        {
          (!links || links.length > 1) && links.map(({url, name}) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const isMatch = location.pathname === url;
            return (
                <Link to={url} key={`${url}-${name}`}>
                  <button>{name}</button>
                </Link>
            )}
          )
        }
      </div>
      {
        children || <div/>
      }
    </nav>
  </div>
};

export default withRouter(AppHeaderNav);
