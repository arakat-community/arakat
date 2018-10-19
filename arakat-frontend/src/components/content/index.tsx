import { Theme, withStyles, WithStyles } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { Route, Switch } from "react-router";
import { ICollapsibleRoute } from "../../common/models/route/collapsible";
import { IRouteGroup } from "../../common/models/route/group";
import { IRouteItem } from "../../common/models/route/item";
import NotFoundView from "../../views/error/not-found";

export interface IContentProps {
    routes: Array<IRouteGroup | IRouteItem>;
    isDrawerOpen: boolean;
}

const style: any = (theme: Theme) => ({
    narrower: {
        backgroundColor: theme.palette.background.default,
        flexGrow: 1,
        width: "80vw",
        transition: `width 2s`, // TODO:
    },
    wider: {
        backgroundColor: theme.palette.background.default,
        flexGrow: 1,
        width: "100vw",

    },
    toolbar: theme.mixins.toolbar,
});

type PropsWithStyle = IContentProps & WithStyles<"narrower" | "wider" | "toolbar">;

const addGroupRoutes: any = (group: IRouteGroup) => {
    let routes: JSX.Element[] = [];
    group.routes.forEach((gRoute) => {
        const collapsibleItem: ICollapsibleRoute = gRoute as ICollapsibleRoute;
        if (collapsibleItem.collapsible) {
            collapsibleItem.routes.forEach((cRoute: IRouteItem) => {
                routes = [...addRoute(cRoute), ...routes];
            });
        } else {
            routes = [...addRoute(gRoute), ...routes];
        }
    });
    return routes;
};

const addRoute: any = (route: IRouteItem) => {
    const routes: JSX.Element[] = [];
    if (route.default) {
        routes.push(getDefaultRoute(route));
    }
    routes.push(<Route {...route}/>);

    return routes;
};

const switchRoutes: any = (routes: Array<IRouteGroup | IRouteItem>) => {
    let sRoutes: JSX.Element[] = [];
    routes.forEach((group) => {
        const groupRoutes: IRouteGroup = group as IRouteGroup;
        if (groupRoutes.routes) {
            sRoutes = [...addGroupRoutes(groupRoutes), ...sRoutes];
        } else {
            sRoutes = [...addRoute(group), ...sRoutes];
        }
    });
    return (
        <Switch>
            {
                ...sRoutes
            }
            <Route component={NotFoundView} />
        </Switch>
   );
};

const getDefaultRoute: (route: IRouteItem) => JSX.Element = (route: IRouteItem) => {
    const {path, exact, ...others} = route;
    return <Route path="/" exact={true} {...others}/>;
};

const Content: React.SFC<PropsWithStyle> = ({classes, ...props}: PropsWithStyle) => (
    <main
        className={
            classNames({
                [classes.narrower]: props.isDrawerOpen,
                [classes.wider]: !props.isDrawerOpen,
            })
        }
    >
        <div
            className={classes.toolbar}
        />
        {switchRoutes(props.routes)}
    </main>
);

export default withStyles(style)(Content);
