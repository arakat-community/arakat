import WorksheetIcon from "@material-ui/icons/PictureInPicture";
import React from "react";
import { FormattedDate, FormattedMessage } from "react-intl";
import { IRouteGroup } from "../common/models/route/group";
import { IRouteItem } from "../common/models/route/item";
import CytoView from "../views/cyto";
import TestView from "../views/test";

export const routes: IRouteItem[] = [
     {
        component: CytoView,
        default: true,
        exact: true,
        icon: WorksheetIcon,
        name: <FormattedMessage id="menu.item.shortcut.worksheet"/>,
        path: "/",
        title: <FormattedMessage id="menu.item.shortcut.worksheet"/>,
     }, 
     {
        component: TestView,
        default: false,
        exact: true,
        icon: WorksheetIcon,
        name: <FormattedMessage id="menu.item.shortcut.worksheet"/>,
        path: "/chart-decision",
        title: <FormattedMessage id="menu.item.shortcut.worksheet"/>,
     }, 
];
