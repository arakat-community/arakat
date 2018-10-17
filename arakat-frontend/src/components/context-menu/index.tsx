import { Theme, WithStyles, withStyles } from "@material-ui/core";
import React from "react";
import { ContextMenu, ContextMenuProvider, Item, Separator, Submenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.min.css";

const style: any = (theme: Theme) => ({
    "@global": {
        ".react-contexify": {
            zIndex: 1,
        },
        ".react-contexify__item__data": {
            fontSize: "1.5rem",
        },
    },
});

/**
 * context menu items.
 * hasSeperator prop will add a seperator for next item
 */
export interface IContextMenuItem {
    children?: IContextMenuItem[];
    hasSeperator?: boolean;
    label: JSX.Element;
    onClick?: (props: any) => void;
}

export interface IContextMenuProps {
    id: string;
    menuItems: IContextMenuItem[];
}

type AllProp = IContextMenuProps & WithStyles;

// const onClick: any = ({ event, ref, data, dataFromProvider }) => console.log("Hello");

const renderMenuItems: any = (menuItem: IContextMenuItem) => (
    <>
        {
            !menuItem.children &&
            <Item
                onClick={menuItem.onClick}
            >
                {menuItem.label}
            </Item>
        }
        {
            menuItem.hasSeperator &&
            <Separator />
        }
        {
            menuItem.children &&
            (
                <Submenu
                    label={menuItem.label}
                >
                    {menuItem.children.map((item) => renderMenuItems(item))}
                </Submenu>
            )
        }
    </>
);

const ContextMenuComponent: React.SFC<AllProp> = ({menuItems, ...props}: AllProp) => (
    <ContextMenu
        id={props.id}
    >
        {
            menuItems.map((menuItem) => renderMenuItems(menuItem))
        }
    </ContextMenu>
);

export default withStyles(style, {withTheme: true})(ContextMenuComponent);
