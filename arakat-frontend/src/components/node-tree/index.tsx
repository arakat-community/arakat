import { Theme, withStyles, WithStyles } from "@material-ui/core";
import Menu, { MenuItem, SubMenu } from "rc-menu";
import "rc-menu/assets/index.css";
import React, { Component } from "react";
import { INodeTree } from "../../common/models/node-tree";
import DraggableNodeComponent from "../draggable-node";
import { animation } from "./animation";

const treeBackgroundColor = '#545C61';

const style: any = (theme: Theme) => ({
    root: {
        paddingTop: "8vh",
        marginLeft: "0",
        backgroundColor: treeBackgroundColor,
    },
    tree: {
        border: "none",
        boxShadow: "none",
        backgroundColor: treeBackgroundColor,
    },
    menuItem: {
        backgroundColor: treeBackgroundColor,
        color: '#E75050' // color of arrow
    },
    nodeCategoryTitle: {
        fontSize: '1.1rem',
        color: 'white'
    }
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

type AllProps = INodeTreeProps & WithStyles<"root" | "tree" | "menuItem" | 'nodeCategoryTitle'>;

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
    public createNodeTree = (arr: any, treeItemType: TreeItemType, depth: number = -1) => {
        depth++;
        const menuTitle = <span className={this.props.classes.nodeCategoryTitle}> { arr.name } </span>
        if (arr.categories && arr.categories.length > 0) {
            if (arr.nodes && arr.nodes.length > 0) {
                return (
                    <SubMenu
                        className={this.props.classes.menuItem}
                        popupClassName={this.props.classes.menuItem}
                        title={menuTitle}
                        style={{
                            paddingTop: '12px'                            
                        }}
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
                        title={menuTitle}
                        style={{
                            paddingTop: '12px'                            
                        }}
                    >
                        {arr.categories.map((subcategory) => this.createNodeTree(subcategory, TreeItemType.category, depth))}
                    </SubMenu>
                );
            }
        } else if (arr.nodes && arr.nodes.length > 0) {
          return (
            <SubMenu
                title={menuTitle}
                className={this.props.classes.menuItem}
                style={{
                    paddingTop: '12px'                            
                }}
            >
              {arr.nodes.map((node) => this.createNodeTree(node, TreeItemType.node, depth))}
            </SubMenu>
          );
        }
        if (treeItemType === TreeItemType.category) {
            return (
                <MenuItem
                    className={this.props.classes.menuItem}
                    style={{
                        paddingTop: '18px'                            
                    }}
                >
                    {menuTitle}
                </MenuItem>
            );
        } else {
            return (
                <DraggableNodeComponent
                    nodeID={arr.node_id}
                    title={arr.name}
                    depth={depth}   
                >
                </DraggableNodeComponent>
            );
        }
        
    }

    /**
     * render
     */
    public render(): JSX.Element {
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
