import UserManagementIcon from "@material-ui/icons/AccountCircle";
import AllInboxIcon from "@material-ui/icons/AllOut";
import DashboardIcon from "@material-ui/icons/Dashboard";
import EjectIcon from "@material-ui/icons/Eject";
import FaceIcon from "@material-ui/icons/Face";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import LanguageIcon from "@material-ui/icons/Language";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import RoleManagementIcon from "@material-ui/icons/Person";
import React from "react";
import { FormattedMessage } from "react-intl";
import { ICollapsibleRoute } from "../common/models/route/collapsible";
import { IRouteGroup } from "../common/models/route/group";
import NotFoundView from "../views/error/not-found";
// import CytoView from "../views/test/cyto-view";
import Test2View from "../views/test2";
import Test3View from "../views/test3";
import { routes as userOperationRoutes } from "./appbar-shortcut";

export const routes: IRouteGroup[] = [
    // {
    //     name: <FormattedMessage id="menu.item.management.operations"/>,
    //     routes: userOperationRoutes,
    // },
];
