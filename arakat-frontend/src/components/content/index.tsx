import { Theme, withStyles, WithStyles } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router";
import { ICollapsibleRoute } from "../../common/models/route/collapsible";
import { IRouteGroup } from "../../common/models/route/group";
import { IRouteItem } from "../../common/models/route/item";
import NotFoundView from "../../views/error/not-found";

export interface IContentProps {
    routes: Array<IRouteGroup | IRouteItem>;
}

const style: any = (theme: Theme) => ({
    content: {
        backgroundColor: theme.palette.background.default,
        flexGrow: 1,
        overflow: "auto",
        padding: theme.spacing.unit * 3,
      },
    toolbar: theme.mixins.toolbar,
});

type PropsWithStyle = IContentProps & WithStyles<"content" | "toolbar">;

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
        className={classes.content}
    >
        <div
            className={classes.toolbar}
        />
        {switchRoutes(props.routes)}
    </main>
);

export default withStyles(style)(Content);
