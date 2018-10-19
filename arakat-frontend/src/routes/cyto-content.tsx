import WorksheetIcon from "@material-ui/icons/PictureInPicture";
import React from "react";
import { FormattedDate, FormattedMessage } from "react-intl";
import { IRouteGroup } from "../common/models/route/group";
import { IRouteItem } from "../common/models/route/item";
import CytoView from "../views/cyto";
import Test2View from "../views/test2";

export const routes: IRouteItem[] = [
     {
        component: CytoView,
        default: false,
        exact: true,
        icon: WorksheetIcon,
        name: <FormattedMessage id="menu.item.shortcut.worksheet"/>,
        path: "/",
        title: <FormattedMessage id="menu.item.shortcut.worksheet"/>,
     }, /*,
     {
        component: Test2View,
        default: false,
        exact: true,
        icon: WorksheetIcon,
        name: <FormattedMessage id="menu.item.shortcut.worksheet"/>,
        path: "/",
        title: <FormattedMessage id="menu.item.shortcut.worksheet"/>,
    }, */
];
