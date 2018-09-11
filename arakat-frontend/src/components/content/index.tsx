import { Theme, withStyles, WithStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Route, RouteComponentProps, RouteProps, Switch, withRouter } from "react-router";
import {IAppState} from "../../app";
import { ICollapsibleRoute } from "../../common/models/route/collapsible";
import { IRouteGroup } from "../../common/models/route/group";
import { IRouteItem } from "../../common/models/route/item";
import { IApplicationState } from "../../store";
import NotFoundView from "../../views/error/not-found";
import TestView from "../../views/test";

export interface IContentProps {
    routes: IRouteGroup[];
}

const style: any = (theme: Theme) => ({
    content: {
        backgroundColor: "initial",
        flexGrow: 1,
        float: "left",
        left: 272,
        padding: theme.spacing.unit * 50,
        paddingLeft: "100px",
        paddingTop: "1px",
        position: "absolute",
        top: 18,
        zIndex: 5,
    },
    toolbar: theme.mixins.toolbar
,
});

type PropsWithStyle = IContentProps & WithStyles<"content" | "toolbar">;

const switchRoutes: any = (routes: IRouteGroup[]) => {
    const sRoutes: JSX.Element[] = [];
    routes.forEach((group) => {
        group.routes.forEach((gRoute) => {
            const collapsibleItem: ICollapsibleRoute = gRoute as ICollapsibleRoute;
            if (collapsibleItem.collapsible) {
                collapsibleItem.routes.forEach((cRoute) => {
                    sRoutes.push(<Route {...cRoute}/>);
                });
            } else {
                const routeItem: IRouteItem = gRoute as IRouteItem;
                sRoutes.push(<Route {...routeItem}/>);
            }
        });
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

const Content: React.SFC<PropsWithStyle> = ({classes, ...props}: PropsWithStyle) => (
    <main className={classes.content}>
        <div className={classes.toolbar} />
        {switchRoutes(props.routes)}
    </main>
);

export default withStyles(style)(Content);
