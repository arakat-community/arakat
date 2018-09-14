import DashboardIcon from "@material-ui/icons/Dashboard";
import EjectIcon from "@material-ui/icons/Eject";
import FaceIcon from "@material-ui/icons/Face";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import LanguageIcon from "@material-ui/icons/Language";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import React from "react";
import { FormattedMessage } from "react-intl";
import { ICollapsibleRoute } from "../common/models/route/collapsible";
import { IRouteGroup } from "../common/models/route/group";
import NotFoundView from "../views/error/not-found";
import TestView from "../views/test";
import Test2View from "../views/test2";
import Test3View from "../views/test3";
import TestResultPage from "../views/testResultPage";

export const routes: IRouteGroup[] = [
    {
      name: <FormattedMessage  id="example.menu.group.application"/>,
      routes: [
            {
                component: Test3View,
                exact: true,
                icon: DashboardIcon,
                name: <FormattedMessage  id="example.menu.dashboard"/>,
                path: "/",
                title: <FormattedMessage  id="example.menu.dashboard"/>,
            },
            {
                component: TestResultPage,
                exact: true,
                icon: DashboardIcon,
                name: <FormattedMessage  id="example.menu.result"/>,
                path: "/",
                title: <FormattedMessage  id="example.menu.result"/>,
            },
            {
                collapsible: true,
                icon: PermIdentityIcon,
                id: 1,
                name: <FormattedMessage id="example.menu.collapsible.1" />,
                routes: [
                    {
                        component: TestView,
                        icon: FaceIcon,
                        name: <FormattedMessage  id="example.menu.user"/>,
                        path: "/test",
                        title: <FormattedMessage  id="example.menu.user"/>,
                    },
                    {
                        component: Test2View,
                        icon: FingerprintIcon,
                        name: <FormattedMessage  id="example.menu.role"/>,
                        path: "/test2",
                        title: <FormattedMessage  id="example.menu.role"/>,
                    },
                ],
            },
            {
                collapsible: true,
                icon: LanguageIcon,
                id: 2,
                name: <FormattedMessage id="example.collapsible.menu.2" />,
                routes: [
                    {
                        component: NotFoundView,
                        icon: EjectIcon,
                        name: <FormattedMessage  id="example.menu.user.logs"/>,
                        path: "/not-found2",
                        title: <FormattedMessage  id="example.menu.role"/>,
                    },
                ],
            },
      ],
    },
];
