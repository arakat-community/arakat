import { Theme, withStyles, WithStyles } from "@material-ui/core";
import classnames from "classnames";
import PropTypes from "prop-types";
import Menu, { MenuItem, SubMenu } from "rc-menu";
import "rc-menu/assets/index.css";
import React, { Component } from "react";
import { INodeTree } from "../../common/models/node-tree";
import DraggableNodeComponent from "../draggable-node";
import { animation } from "./animation";

const style: any = (theme: Theme) => ({
    black: {
        marginTop: "10vh",
        backgroundColor: theme.palette.background.default,
    },
    root: {
        marginTop: "8vh",
        marginLeft: "0",
        backgroundColor: theme.palette.background.default,
    },
    tree: {
        margin: "0px",
        border: "none",
        boxShadow: "none",
    },
    menuItem: {
        backgroundColor: theme.palette.background.default,
        color: "white",
        fontSize: "1.25rem",
    },
});

/**
 * TreeItemType enum
 */
enum TreeItemType {
    category,
    node,
}

export interface INodeTreeProps {
    nodeTree: INodeTree;
}

type AllProps = INodeTreeProps & WithStyles<"root" | "black" | "tree" | "menuItem">;

/**
 * NodeTreeComponent class
 */
class NodeTreeComponent extends Component<AllProps> {

    constructor(props: AllProps) {
        super(props);
    }

    /**
     * create node repository
     */
    public createNodeTree = (arr: any, treeItemType: TreeItemType, depth: number = 0) => {
        if (arr.categories && arr.categories.length > 0) {
            depth++;
            if (arr.nodes && arr.nodes.length > 0) {
                return (
                    <SubMenu
                        className={this.props.classes.menuItem}
                        popupClassName={this.props.classes.menuItem}
                        title={arr.name}
                    >
                        {arr.nodes.map((node) => this.createNodeTree(node, TreeItemType.node, depth))}
                        {arr.categories.map((subcategory) => this.createNodeTree(subcategory, TreeItemType.category, depth))}
                    </SubMenu>
                );
            } else {
                return (
                    <SubMenu
                        className={this.props.classes.menuItem}
                        popupClassName={this.props.classes.menuItem}
                        title={arr.name}
                    >
                        {arr.categories.map((subcategory) => this.createNodeTree(subcategory, TreeItemType.category, depth))}
                    </SubMenu>
                );
            }
        } else if (arr.nodes && arr.nodes.length > 0) {
          return (
            <SubMenu
                title={arr.name}
                className={this.props.classes.menuItem}
            >
              {arr.nodes.map((node) => this.createNodeTree(node, TreeItemType.node, depth))}
            </SubMenu>
          );
        }
        if (treeItemType === TreeItemType.category) {
            return (
                <MenuItem
                    className={this.props.classes.menuItem}
                >
                    {arr.name}
                </MenuItem>
            );
        } else {
            return (
                <DraggableNodeComponent
                    nodeID={arr.node_id}
                    title={arr.name}
                    depth={depth}
                >
                    {arr.name}
                </DraggableNodeComponent>
            );
        }
    }

    /**
     * render
     */
    public render(): JSX.Element { // TODO: less code.
        const { classes, nodeTree } = this.props;
        if (nodeTree.data.length > 0) {
            return (
                <div
                    className={classes.root}
                >
                    <Menu
                        className={classes.tree}
                        mode="inline"
                        openAnimation={animation}
                    >
                        {nodeTree.data.map((item) => {
                            return this.createNodeTree(item, TreeItemType.category);
                        })}
                    </Menu>

                </div >
            );
        } else {
            return (
                <div
                    className={classes.root}
                >
                    <Menu
                        className={classes.tree}
                        mode="inline"
                        openAnimation={animation}
                    >
                        <span> no nodes. </span>
                    </Menu>

                </div >
            );
        }

    }

}

export default withStyles(style, {withTheme: true})(NodeTreeComponent);
