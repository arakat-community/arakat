import Menu, { MenuItem, SubMenu } from "rc-menu";
import "rc-menu/assets/index.css";
import React from "react";

interface ITestState {
  bool: boolean;
  subTitle: string;
}

/**
 *
 * class
 */
class Test3View extends React.Component<
  { id: any; children: any; name: any; parent: any },
  ITestState
> {
  public state = {
    bool: false,
    subTitle: "",
  };
  public createTable = (arr: any) => {
    const menuItems = [];

    for (const menuItem of arr) {
      if (menuItem.nodes.length === 0) {
        menuItems.push(<MenuItem key={menuItem.id}>{menuItem.name}</MenuItem>);
      } else {
        menuItems.push(
          <SubMenu title={menuItem.name} key={menuItem.id}>
            <Test3View
              parent={this}
              key={menuItem.id}
              id={menuItem.id}
              name={menuItem.nodes[arr.indexOf(menuItem)].name}
              children={menuItem.nodes}
            />
          </SubMenu>,
        );
      }
    }
    // console.log(menuItems);
    return menuItems;
  }

  /**
   *
   * render
   */
  public render() {
    return (
      <SubMenu
        parentMenu={this.props.parent}
        title={this.props.name}
        key={this.props.id}
      >
        {this.createTable(this.props.children)}
      </SubMenu>
    );
  }
}
// export default withStyles(styles)(Test2View);
export default Test3View;
