import { Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import Menu, { Divider, MenuItem, SubMenu } from "rc-menu";
import "rc-menu/assets/index.css";
import React from "react";

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
        name: "Preprocessing"
      },
      {
        id: 5,
        name: "Algorithms",
        nodes: [
          {
            name: "Linear Regression",
            node_family_type: "BatchReadFromFile",
            node_id: 20,
            node_type: 0
          }
        ]
      }
    ]
  }
];
const hey: number = 1;

const myObject: any = [
  // demoJson[0].name,
  // demoJson[0].subcategories[0].name,
  // demoJson[0].subcategories[1].name,
  // demoJson[0].subcategories[1].nodes[0].name,
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
    paddingLeft: theme.spacing.unit * 4
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 360,
    width: "100%"
  }
});
type AllProps = WithStyles<"root" | "nested">;

/**
 *
 * class
 */
class Test2View extends React.Component {
  public state = {
    anchorEl: "inline"
  };

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
      // myObject'e pushlama sırasında id,value map'i yapılıyor.
      if (i2 !== "name") {
        const h = 0;
      } else {
        myObject.push(
          <MenuItem key={demoJson2[0].id}> {demoJson2[0].name} </MenuItem>
        );
      }
    }
    return myObject;
  };

  /**
   *
   * handleClick
   */
  // public handleClick = (info: string) => {
  //   console.log("click ", info);
  // };
  public handleStateVertical = event => {
    this.setState({ anchorEl: "vertical" });
  };

  public handleStateInline = () => {
    this.setState({ anchorEl: "inline" });
  };
  /**
   *
   * render
   */
  public render() {
    // console.log(myObject);
    // const { classes } = this.props;
    return (
      <div className="App">
        <Menu mode="horizontal">
          {/* <MenuItem>Data Sources</MenuItem> */}
          {this.handleJson(demoJson)}
          {/* {this.handleJson(myObject[1])}
          {this.handleJson(myObject[2])}  */}
          {/* <MenuItem>Data Sinks</MenuItem>
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
