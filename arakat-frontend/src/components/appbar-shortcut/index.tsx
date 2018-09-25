import { IconButton, Tooltip } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import WorksheetIcon from "@material-ui/icons/PictureInPicture";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { FormattedMessage } from "react-intl";
import { IRouteItem } from "../../common/models/route/item";

export interface IAppbarShortcutProps {
    id?: string;
    routes: IRouteItem[];
}

type AllType = IAppbarShortcutProps;

const AppbarShortcutComponent: React.SFC<AllType> = ({routes, ...props}: AllType) => (
    <>
        {/* <Tooltip
            title={<FormattedMessage id="menu.item.shortcut.search"/>}
        >
                <IconButton
                    key="search-icon"
                >
                    <SearchIcon />
                </IconButton>
        </Tooltip> */}
        {
            // routes.map((route, index) => (
            //     <Tooltip
            //         key={`tooltip_${index}`}
            //         title={route.title}
            //     >
            //             <IconButton
            //                 href={route.path}
            //                 key={`icon_${index}`}
            //             >
            //                 <route.icon />
            //             </IconButton>
            //     </Tooltip>
            // ))
        }
    </>
);

export default AppbarShortcutComponent;
