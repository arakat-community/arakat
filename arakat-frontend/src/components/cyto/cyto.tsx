import { Theme, WithStyles, withStyles } from "@material-ui/core";
import cytoscape from "cytoscape";
import coseBilkent from "cytoscape-cose-bilkent";
import edgehandles from "cytoscape-edgehandles";
import MouseTrap from "mousetrap";
import React, { Component } from "react";
import { ConnectDropTarget, DropTarget} from "react-dnd";
import { findDOMNode } from "react-dom";
import { DraggableType } from "../../common/models/draggable/type";
import { layout } from "./layout";
import { def_style, getBackground, getShape, MAX_ZOOM } from "./style";

const style: any = (theme: Theme) => ({
  default: {
      height: "100%",
  },
  highlighted: {
      border: "1px solid orange",
      height: "100%",
  },
});

export interface ICytoProps {
  parentSelectChangeHandler?: () => void;
  edgeAdditionPolicy?: any;
  highlighted: boolean;
  hovered: boolean;
  connectDropTarget: ConnectDropTarget; // look at return type, don't make it 'any'
  isOver: boolean;
}

export interface ICytoState {
  isPrimitiveLevelLayoutRefreshBlocked: boolean;
  nodeId: string;
}

const nodeTarget = {
  hover(props, monitor, component) {
    const clientOffset = monitor.getClientOffset();
    console.log("hover -> clientOffset: "  + clientOffset);
  },
  drop(props, monitor, component) {
    if ( monitor.didDrop() ) {
      console.log("dropped.");
      return;
    }
  },
};
const collect = (connect, monitor) => {
  return {
     highlighted: monitor.canDrop(),
     connectDropTarget: connect.dropTarget(),
     isOver: monitor.isOver(),
  };
};

type PropsAndStyle = ICytoProps & WithStyles<"default" | "highlighted">;

/**
 * CytoGraph Class
 */
class CytoGraph extends Component<PropsAndStyle, ICytoState> {
  private cydyna: any;

  constructor(props: PropsAndStyle) {
    super(props);

    this.state = {
      isPrimitiveLevelLayoutRefreshBlocked: false,
      nodeId: "",
    };

    this.removeSelectedElements = this.removeSelectedElements.bind(this);
    this.removeElement = this.removeElement.bind(this);

    // coseBilkent register extension
    cytoscape.use(coseBilkent);

    // edgehandles register extension
    cytoscape.use(edgehandles);
  }

  public componentDidMount() {
    this.createGraph();

    MouseTrap.bind(["del", "backspace"], this.removeSelectedElements);

    this.addParent({
      data: {
        id: "n0",
        visibleName: "defaultCyto",
      },
    });

    /*this.addNode({
      data: {
        id: "n1",
        nodeType: "DATASOURCE",
        parent: "",
        visibleName: "CytoTriangle"
      },
      style: {
        backgroundColor: "magenta",
        height: 50,
        shape: "triangle",
        width: 50
      }
    });*/
  }
  public componentWillReceiveProps(nextProps) {
    if (!this.props.isOver && nextProps.isOver) {
      console.log("Cyto.componentWillReceiveProps -> nextProps.isOver: " + nextProps.isOver);
    }
  }
  public componentWillUnmount() {
    MouseTrap.unbind(["del", "backspace"], this.removeSelectedElements);
  }

  public createGraph = () => {
    this.cydyna = cytoscape({
      container: document.getElementById("cydyna"),
      selectionType: "additive",
      style: def_style,
    });

    this.cydyna
      .style()
      .selector("node")
      .style({
        "background-color": (ele) => {
          return getBackground(ele);
        },
      });

    this.cydyna // image'ı node'a sığdır
      .style()
      .selector("node")
      .css({
        "background-fit": "cover",
      });

    this.cydyna
      .style()
      .selector("node")
      .style({
        shape: (ele) => {
          return getShape(ele);
        },
      });

    this.cydyna // node image
      .style()
      .selector("#cat")
      .css({
        "background-image":
          "https://farm2.staticflickr.com/1261/1413379559_412a540d29_b.jpg",
      });

    this.cydyna.maxZoom(MAX_ZOOM);

    this.cydyna.edgehandles({
      // edgeType: (sourceNode, targetNode) => {
      //     return this.edgeAdditionPolicyChecker(sourceNode, targetNode);
      // },
      handleColor: "red",
      handleIcon: false,
      handleNodes: "node",
      handleSize: 10,
      noEdgeEventsInDraw: true,
      preview: false,
      toggleOffOnLeave: true,
    });

    // this.cydyna.on("select", this.props.parentSelectChangeHandler);
    // this.cydyna.on("unselect", this.props.parentSelectChangeHandler);

    this.refreshLayout();
  }

  public refreshLayout = () => {
    this.cydyna.layout(layout);
    this.cydyna.center();
  }

  public removeSelectedElements = () => {
    const selectedElementList = this.getSelectedElement();

    selectedElementList.forEach((e) => {
      this.cydyna.$("#" + e.id()).unselect();
      this.removeElement(e.id());
    });

    this.refreshLayout();
  }

  public removeElement = (elementID) => {
    this.cydyna.remove(this.cydyna.$("#" + elementID));
  }

  public getSelectedNodes = () => {
    return this.cydyna.$(":selected");
  }

  public getSelectedElement = () => {
    return this.cydyna.$(":selected");
  }

  public getElement = (filter) => {
    return this.cydyna.filter(filter);
  }

  public resize = () => {
    this.cydyna.resize();
  }

  public unselectAll = () => {
    this.cydyna.$().unselect();
  }

  public addNode = (nodeData) => {
    const nodeID = this.cydyna
      .add({
        data: nodeData.data,
        group: "nodes",
        style: nodeData.style,
      })
      .id();

    if (nodeData.selected) {
      this.cydyna.$("#" + nodeID).select();
    }

    this.refreshLayout();

    return nodeID;
  }

  public addEdge = (sourceNodeID, targetNodeID) => {
    const edgeID = this.cydyna
      .add({
        data: {
          source: sourceNodeID,
          target: targetNodeID,
        },
        group: "edges",
      })
      .id();

    this.refreshLayout();

    return edgeID;
  }

  public addParent = (parentData) => {
    const parentID = this.cydyna.add({
      classes: "",
      data: parentData.data,
      //grabbable: true,
      //grabbed: false,
      group: "nodes",
      //locked: false,
      nodeType: "PARENT",
      //removed: false,
      //selectable: true,
      //selected: false,
      /*style: {
        backgroundOpacity: 0.333,
        height: 125,
        shape: "rectangle",
        width: 125,
      },*/
    });

    this.refreshLayout();

    return parentID;
  }

  public addEdgeFromSelectedNodeToGivenNode = (nodeData) => {
    this.setState({
      isPrimitiveLevelLayoutRefreshBlocked: true,
    });

    const selectedNodeList = this.getSelectedNodes();
    const targetNodeID = this.addNode(nodeData);

    selectedNodeList.forEach((node) => {
      const sourceNodeID = node.id();
      this.addEdge(sourceNodeID, targetNodeID);
    });

    this.refreshLayout();

    this.setState({
      isPrimitiveLevelLayoutRefreshBlocked: false,
    });

    return targetNodeID;
  }
  /**
   * Json
   */
  public getGraphJSON() {
    this.cydyna.json();
  }

  public edgeAdditionPolicyChecker = (sourceNode, targetNode) => {
    if (!this.props.edgeAdditionPolicy.isDuplicateAllowed) {
      if (this.checkDuplicateFor(sourceNode, targetNode)) {
        return undefined;
      }
    }
    if (!this.props.edgeAdditionPolicy.isReverseAllowed) {
      if (this.checkDuplicateFor(sourceNode, targetNode)) {
        return undefined;
      }
    }

    if (this.checkIsPairNotAllowed(sourceNode, targetNode)) {
      return undefined;
    }

    return "flat";
  }

  public checkDuplicateFor = (sourceNode, targetNode) => {
    const duplicates = this.cydyna.edges(
      "[source = '" + sourceNode.id() + "'][target = '" + targetNode.id() + "']",
    );

    if (duplicates.length === 0) {
      return false;
    }
    /**
     * Json
     */
  }
  public checkIsPairNotAllowed = (sourceNode, targetNode) => {
    let check = false;
    const notAllowedPairs = this.props.edgeAdditionPolicy.notAllowedPairs;

    if (notAllowedPairs.length > 0) {
      let i;
      for (i = 0; i < notAllowedPairs.length; i++) {
        if (
          sourceNode.data("nodeType").localeCompare(notAllowedPairs[i][0]) ===
            0 &&
          targetNode.data("nodeType").localeCompare(notAllowedPairs[i][1]) === 0
        ) {
          check = true;
          break;
        }
      }
    }

    return check;
  }

  public setNodeParent = (parentID) => {
    {
      console.log(parentID);
    }
    const selectedNodeList = this.getSelectedNodes();

    selectedNodeList.forEach((node) => {
      this.cydyna.$("#" + node.id()).move({
        parent: parentID,
      });
    });
    this.refreshLayout();
  }

  public addDefaultNode = () => {
    this.setState({
      nodeId: this.addNode({
        data: {
          // id: "cat"
        },
        style: {
          backgroundColor: "gray",
          height: 50,
          shape: "rectangle",
          width: 50,
        },
      }),
    });
  }

  public setNodeData = (nodeData) => {
    const selected = this.getElement(this.state.nodeId);
    (selected.data = jsonNodeData.data), (selected.style = jsonNodeData.style);

    selected.data.visibleName = nodeData.value;
    this.cydyna.$id(this.state.nodeId).data(selected.data);

    selected.style.backgroundColor = "red";
    this.setNodeStyle(this.state.nodeId, selected.style);
    setTimeout(() => {
      selected.style.backgroundColor = "green";
      this.setNodeStyle(this.state.nodeId, selected.style);
      alert("node ready");
    },         2000);
  }

  public setNodeStyle = (nodeId, nodeStyle) => {
    this.cydyna.$id(nodeId).style(nodeStyle);
  }
  /**
   * render output of cyto
   */
  public render(): JSX.Element {
    const { classes, highlighted, connectDropTarget } = this.props;
    return connectDropTarget(
        <div
            className={classes.default}
            id="cydyna"
        />,
    );
  }
}
/**
 * enum
 *
 */
enum NodeCategories {
  DataSources = "DataSources",
  DataSinks = "DataSinks",
  ETL = "ETL",
  ML = "ML",
}

const jsonNodeData: any = {
  data: {
    category: 10,
    family: 6,
    node_id: 6,
    node_type: 0,
    // visibleName: "Decision Tree Regressor"
  },
  style: {
    backgroundColor: "green",
    height: 50,
    width: 50,
  },
};

/*
const filterPaneSpec: object = {
  drop: (props: IFilterPaneProps, monitor: DragSourceMonitor, component: Component | null) => {
        const droppedItem: any = cloneObj(Object.assign({}, monitor.getItem(), {id: guid().uid()}));
        props.onFilterDropped(droppedItem);
        return { name: "An item dropped on worksheet" };
  },
};
*/

const droppableCytoGraph = DropTarget(DraggableType.Node, nodeTarget, collect)(CytoGraph);
export default withStyles(style, {withTheme: true})(droppableCytoGraph);

// export default CytoGraph;
