import Menu, { MenuItem, SubMenu } from "rc-menu";
import "rc-menu/assets/index.css";
import React from "react";

interface ITestState {
  mode: string;
  count: number;
}

interface ICategoriesData {
  id: number;
  name: string;
  subcategories: ISubCategory[];
}

interface ISubCategory {
  id: number;
  name: string;
  categoryNode: ICategoryNode[];
}

interface ICategoryNode {
  name: string;
  node_type: number;
  node_id: number;
  node_family_type: NodeTypeToNodeFamilyType;
}

/**
 * enum
 *
 */
enum NodeCategories {
  DataSources,
  DataSinks,
  ETL,
  ML,
  Preprocessing,
  Algorithms,
  FeatureExtraction,
  Scaling,
  FeatureReductionSelection,
  Clustering,
  Regression,
  Classificiation,
  Evaluation,
  DataMining,
  Statistics,
  Visualizations,
}

/**
 * enum
 *
 */
enum NodeTypeToNodeFamilyType {
  BatchReadFromFile = 0,
  BatchReadFromKafka = 1,
  BatchWriteToFile = 2,
  BatchWriteToKafka = 3,
  CrossValidator = 4,
  DDFO = 5,
  Estimator = 6,
  Evaluator = 7,
  Join = 8,
  ModelApply = 9,
  ModelLoad = 10,
  ModelSave = 11,
  Pipeline = 12,
  RandomSplit = 13,
  StreamReadFromFile = 14,
  StreamReadFromKafka = 15,
  StreamWriteToFile = 16,
  StreamWriteToKafka = 17,
  Transformer = 18,
  ModelHolder = 19,
}

const demoJson: any[] = [
  // array of object
  {
    id: 0,
    name: "Data Sources",
    subcategories: [
      // array olacak
      {
        id: 0,
        name: "DemoSubcategory",
        subcategories: [
          {
            id: 5,
            name: "Demo Algorithms",
            nodes: [
              {
                name: "Linear Regression",
                node_family_type: "BatchReadFromFile",
                node_id: 20,
                node_type: 0,
              },
              {
                name: "Linear Regression 2",
                node_family_type: "BatchReadFromFile",
                node_id: 22,
                node_type: 0,
              },
            ],
          },
        ],
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
          {
            name: "Linear Regression 2",
            node_family_type: "BatchReadFromFile",
            node_id: 22,
            node_type: 0,
          },
        ],
      },

      {
        id: 4,
        name: "Preprocessing",
        nodes: [],
      },
    ],
  },
  {
    id: 1,
    name: "Data Sources 2",
    subcategories: [
      // array olacak
      {
        id: 5,
        name: "Algorithms 2",
        nodes: [
          {
            name: "Linear Regression",
            node_family_type: "BatchReadFromFile",
            node_id: 20,
            node_type: 0,
          },
          {
            name: "Linear Regression 2",
            node_family_type: "BatchReadFromFile",
            node_id: 22,
            node_type: 0,
          },
        ],
      },

      {
        id: 4,
        name: "Preprocessing",
        nodes: [],
      },
    ],
  },
];

// const styles: any = (theme: Theme) => ({
//   nested: {
//     paddingLeft: theme.spacing.unit * 4
//   },
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     maxWidth: 360,
//     width: "100%"
//   }
// });
// type AllProps = WithStyles<"root" | "nested">;

/**
 *
 * class
 */
class Test2View extends React.Component {
  public state = {
    anchorEl: "inline",
    count: 0,
  };

  /**
   *
   *
   *
   */

  public createMenu = (arr: any) => {
    if (arr.subcategories && arr.subcategories.length > 0) {
      return (
        <SubMenu title={arr.name}>
          {arr.subcategories.map((subcategory) => this.createMenu(subcategory))}
        </SubMenu>
      );
    } else if (arr.nodes && arr.nodes.length > 0) {
      return (
        <SubMenu title={arr.name}>
          {arr.nodes.map((node) => this.createMenu(node))}
        </SubMenu>
      );
    }
    return <MenuItem>{arr.name}</MenuItem>;
  }

  /**
   *
   * render
   */
  public render() {
    return (
      <div className="App">
        <Menu mode="horizontal">
          {demoJson.map((item) => {
            return this.createMenu(item);
          })}
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
