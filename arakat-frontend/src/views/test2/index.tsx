import { Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import Menu, { Divider, MenuItem, SubMenu } from "rc-menu";
import "rc-menu/assets/index.css";
import React from "react";
import { Component } from "react-redux";
import { SubmissionError } from "redux-form";
import { isNull } from "util";
import Test3View from "../test3";

interface ITestState {
  mode: string;
} // menu,category ve node lar için 3 ayrı interface oluştur.
const demoJson: any = [
  // array of object
  {
    id: 0,
    name: "Data Sources",
    subcategories: [
      // array olacak
      {
        id: 4,
        name: "Preprocessing",
        nodes: [],
      },
      {
        id: 5,
        name: "Algorithms",
        nodes: [
          {
            name: "Linear Regression",
            node_family_type: "BatchReadFromFile",
            node_id: 20,
            node_type: 0,
          },
        ],
      },

    ],
  },
  {
    id: 1,
    name: "Data Sources 2",
    subcategories: [],
  },
];
const menuArray: any = [
];

const SubMenuArray: any = [

];

const menuItemArray: any = [

];

{
  /*options.map(option => (
  <MenuItem
    key={option}
    selected={option === "Pyxis"}
    onClick={this.handleClose}
  >
    {option}
  </MenuItem>  map fonksiyonu ile menu itemi doldurma
))*/
}

const styles: any = (theme: Theme) => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 360,
    width: "100%",
  },
});
type AllProps = WithStyles<"root" | "nested">;

/**
 *
 * class
 */
class Test2View extends React.Component {
  public state = {
    anchorEl: "inline",
  };
// /**
  //  *
  //  * handleSelect
  //  */
  public addToSubMenu = (menuitem: any) => {

    return <SubMenu title="">

    </SubMenu>;
    }
// /**
  //  *
  //  * handleSelect
  //  */
  public addToMenu = (menu: any) => {

    menuArray.push(<Menu mode="horizontal"></Menu>);

    }

    // /**
  //  *
  //  * handleSelect
  //  */
  public addMenuItem = (menuitem: any, SubMenuOrMenu: number) => {
    if (SubMenuOrMenu === 0) {
    menuItemArray.push(<MenuItem >{menuitem}</MenuItem>);
    } else {
    SubMenuArray.push(<MenuItem >{menuitem}</MenuItem>);
    }

    }

  // /**
  //  *
  //  * handleSelect
  //  */

  public handleJson = (demoJson2: any) => {
    /* return demoJson2.map(
      (option) => (
        console.log(option), <MenuItem key={option.id}>{option.name}</MenuItem>
      ),
    );*/

    for (const i2 in demoJson2[0]) {
      // pushlama sırasında id,value map'i yapılıyor.
      if (i2 === "subcategories") {
        //  menuArray.push(<SubMenu title={demoJson2[0].name}></SubMenu>);
          for (const i3 in demoJson2[0].subcategories) {
                if (!isNull(i3)) {
                    SubMenuArray.push(<MenuItem>{demoJson2[0].subcategories[i3].name}</MenuItem>);
                }
          }
          menuArray.push(SubMenuArray);

        }
    }
   /* menuArray.map(option => ( text olarak dene var comp += <MenuItem>exp</MenuItem> gibi..
  <Menu mode="horizontal">

  </Menu>
))*/
    return menuArray;
  }

  /**
   *
   * handleClick
   */
  // public handleClick = (info: string) => {
  //   console.log("click ", info);
  // };
  public handleStateVertical = (event) => {
    this.setState({ anchorEl: "vertical" });
  }
// /**
  //  *
  //  * handleSelect
  //  */
  public handleStateInline = () => {
    this.setState({ anchorEl: "inline" });
  }

/* {this.handleJson(demoJson)} */

  public createTable = (arr: any) => {
        const menuItems = [];

        // Outer loop to create parent
        for (const menuItem of arr) {
            if (menuItem.subcategories.length === 0) {
                menuItems.push(<MenuItem key={menuItem.id}>{menuItem.name}</MenuItem>);
            } else {
                menuItems.push(<Test3View parent={0} key={menuItem.id}
                id={menuItem.id} name={menuItem.name} children={menuItem.subcategories}/>);
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
      <div className="App">
        <Menu key="0" mode="horizontal">
            {this.createTable(demoJson)}
          {/* <MenuItem>{demoJson[0].name}</MenuItem>
          <MenuItem>Data Sinks</MenuItem>
          <MenuItem>ETL</MenuItem>
          <SubMenu title="ML">
            <SubMenu title="Preprocessing">
              <MenuItem onClick={() => alert("tıklandı")}>
                Feature Extraction
              </MenuItem>
              <MenuItem>Scaling</MenuItem>
              <MenuItem>Feature Reduction/Selection</MenuItem>
            </SubMenu>
            <SubMenu title="Algorithms">
              <MenuItem>Clustering</MenuItem>
              <MenuItem>Regression</MenuItem>
              <MenuItem>Classificiation</MenuItem>
            </SubMenu>
            <MenuItem>Evaluation</MenuItem>
          </SubMenu>
          <MenuItem>Data Mining</MenuItem>
          <MenuItem>Statistics</MenuItem>
          <MenuItem>Visualizations</MenuItem> */}
        </Menu>
      </div>
    );
  }
}
// export default withStyles(styles)(Test2View);
export default Test2View;
