import { Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import Menu, { Divider, MenuItem, SubMenu } from "rc-menu";
import "rc-menu/assets/index.css";
import React from "react";
import { Component } from "react-redux";
import { SubmissionError } from "redux-form";
import { isNull } from "util";

/**
 *
 * class
 */
class Test3View extends React.Component<{id: any, name: string, children: any, parent: any}> {
  public createTable = (arr: any) => {
      console.log(arr);
      const menuItems = [];

        // Outer loop to create parent
      for (const menuItem of arr) {
            if (menuItem.nodes.length === 0) {
                menuItems.push(<MenuItem key={menuItem.id}>{menuItem.name}</MenuItem>);
            } else {
                menuItems.push(<Test3View parent={this.props.parent} key={menuItem.id}
                    id={menuItem.id} name={menuItem.name} children={menuItem.nodes}/>);
            }
        }
      return menuItems;
    }

  /**
   *
   * render
   */
  public render() {

     return (
        <SubMenu parentMenu={this.props.parent} title={this.props.name} key={this.props.id}>
            {this.createTable(this.props.children)}
        </SubMenu>
    );
  }
}
// export default withStyles(styles)(Test2View);
export default Test3View;
