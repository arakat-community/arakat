import { Theme, WithStyles, withStyles } from "@material-ui/core";
import cytoscape from "cytoscape";
import coseBilkent from "cytoscape-cose-bilkent";
import edgehandles from "cytoscape-edgehandles";
import MouseTrap from "mousetrap";
import React, { Component } from "react";
import { ConnectDropTarget, DropTarget} from "react-dnd";
import { NodeTypes } from "../../common/models/cyto-elements/node-types";
import { DraggableType } from "../../common/models/draggable/type";
import { INodeSpec } from "../../common/models/node-specs";
import { ICytoState } from "../../store/cyto/types";
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
  addNodeToExistingNodes: (nodeSpec: INodeSpec) => void;
  increaseCVNodesLength: () => void;
  increasePipelineNodesLength: () => void;
  increaseTaskNodesLength: () => void;
  edgeAdditionPolicy?: any;
  highlighted?: boolean;
  hovered?: boolean;
  connectDropTarget: ConnectDropTarget; // look at return type, don't make it 'any'
  isOver: boolean;
  dragItem: any;
  didDrop: boolean;
  cytoState: ICytoState; // from props
}

const nodeTarget = {
  /*
  //TODO: use hover to highlight the intended parent node.
  hover(props, monitor, component) {
    const clientOffset = monitor.getClientOffset();
    console.log("hover -> clientOffset: ");
    console.log(clientOffset);
    return clientOffset;
  },
  */
  drop(props, monitor, component) {
    if ( monitor.didDrop() ) {
      return;
    }
    const adjustedOffset = {
      x: monitor.getClientOffset().x - 300,
      y: monitor.getClientOffset().y - 50,
    };
    component.props.setLastDroppedNodeOffset(adjustedOffset);
    return { moved: true };
  },
};
const collect = (connect, monitor) => {
  return {
     highlighted: monitor.canDrop(),
     connectDropTarget: connect.dropTarget(),
     isOver: monitor.isOver(),
     dragItem: monitor.getItem(),
     didDrop: monitor.didDrop(),
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
  }

  public componentWillReceiveProps(nextProps) {
    if (!this.props.didDrop && nextProps.didDrop) {
      nextProps.cytoState.nodeSpecs.map((nodeSpec) => {
        // TODO: dragItem.node_id should be int.
        if (nodeSpec.node_id === parseInt(nextProps.dragItem.node_id, 10)) {
          this.props.addNodeToExistingNodes(nodeSpec);
          this.addNode(nodeSpec);
          return;
        }
      });
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
      panningEnabled: false,
      zoomingEnabled: true,
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

  public addNode = (nodeSpec) => {
    let parentID = this.getParentIDDroppedInto();
    if (parentID === -1) {
       const taskNode = this.prepareTaskNodeData();
       parentID = this.addTaskNode(taskNode);
    }
    let nodeID = -1;
    const nodeOffset = this.props.cytoState.lastDroppedNodeOffset;

    const nodeData = {
        id: nodeSpec.node_id,
        nodeType: nodeSpec.node_type,
        parent: parentID,
        visibleName: nodeSpec.name,
    };
    switch (nodeSpec.node_type) {
      case NodeTypes.innerNode:
        nodeID = this.addInnerNode(nodeData, nodeOffset);
        break;
      case NodeTypes.pipelineNode:
        nodeID = this.addPipelineNode(nodeData, nodeOffset);
        break;
      case NodeTypes.cvNode:
        nodeID = this.addCVNode(nodeData, nodeOffset);
        break;
      default:
        alert("None of the defined types :\\");
        break;
    }
    /*
    if (nodeData.selected) {
      this.cydyna.$("#" + nodeID).select();
    }
    */
    this.refreshLayout();
    return nodeID;
  }

  public getParentIDDroppedInto = () => {
    const nodeOffset = this.props.cytoState.lastDroppedNodeOffset;
    let parentID = -1;
    const elements = this.cydyna._private.elements;
    if (elements.length > 0) {
      if (this.props.cytoState.cvNodesLength > 0) {
        parentID = this.searchInSpesificParentNodeGroup(elements, NodeTypes.cvNode, nodeOffset);
      }
      // look!: this.props.cytoState.pipelineNodesLength is 2, but it should be 1.
      if (parentID === -1 && this.props.cytoState.pipelineNodesLength > 0) {
        parentID = this.searchInSpesificParentNodeGroup(elements, NodeTypes.pipelineNode, nodeOffset);
      }
      if (parentID === -1 && this.props.cytoState.taskNodesLength > 0) {
        parentID = this.searchInSpesificParentNodeGroup(elements, NodeTypes.taskNode, nodeOffset);
      }

    }
    return parentID;
  }

  public searchInSpesificParentNodeGroup = (elements, nodeType, nodeOffset) => {
    let parentID = -1;
    elements.map((element) => {
      if (element._private.data.nodeType === nodeType) {
          const parentBoundingBox = element.boundingBox();
          if (this.isNodeInBoundingBox( nodeOffset, element, parentBoundingBox )) {
            parentID = element._private.data.id;
            return parentID;
          }
      }
    });
    return parentID;
  }
  public isNodeInBoundingBox = (nodeOffset, element, parentBoundingBox) => {
      if (
        nodeOffset.x > element._private.position.x - parentBoundingBox.w / 2 &&
        nodeOffset.x < element._private.position.x + parentBoundingBox.w / 2 &&
        nodeOffset.y > element._private.position.y - parentBoundingBox.h / 2 &&
        nodeOffset.y < element._private.position.y + parentBoundingBox.h / 2
      ) {
        return true;
      } else {
        return false;
      }
  }
  public addInnerNode = (nodeData, nodeOffset) => {
   const nodeID = this.cydyna
      .add({
        data: nodeData,
        group: "nodes",
        position: { x: nodeOffset.x, y: nodeOffset.y},
        style: {
          backgroundColor: "white",
          height: 50,
          shape: "ellipse",
          width: 50,
        },
      })
      .id();
   return nodeID;
  }

  public addPipelineNode = (nodeData, nodeOffset) => {
    const nodeID = this.cydyna
        .add({
          data: nodeData,
          group: "nodes",
          position: { x: nodeOffset.x, y: nodeOffset.y},
          style: {
            backgroundColor: "green",
            height: 50,
            shape: "rectangle",
            width: 100,
          },
        })
        .id();
    this.props.increasePipelineNodesLength();
    return nodeID;
  }

  public addCVNode = (nodeData, nodeOffset) => {
    const nodeID = this.cydyna
        .add({
          data: nodeData,
          group: "nodes",
          position: { x: nodeOffset.x, y: nodeOffset.y},
          style: {
            backgroundColor: "orange",
            height: 50,
            shape: "rectangle",
            width: 50,
          },
        })
        .id();
    this.props.increaseCVNodesLength();
    return nodeID;
  }
  public prepareTaskNodeData = () => {
    let nodeId = "task";
    let visibleName = "Task node ";
    if
    (
      this.props.cytoState.taskNodesLength &&
      this.props.cytoState.taskNodesLength > 0
    ) {
        nodeId += `${this.props.cytoState.taskNodesLength}`;
        visibleName += `${this.props.cytoState.taskNodesLength + 1}`;
    } else {
        nodeId += "0";
        visibleName += "1";
    }
    return {
        data: {
          id: nodeId,
          nodeType: NodeTypes.taskNode,
          parent: "none",
          visibleName,
        },
    };
  }
  public addTaskNode = (node) => {
    const nodeOffset = this.props.cytoState.lastDroppedNodeOffset;
    this.cydyna.add({
      classes: "",
      data: node.data,
      //grabbable: true, // is this default?
      //grabbed: false,
      group: "nodes",
      position: { x: nodeOffset.x, y: nodeOffset.y},
      //locked: false,
      //removed: false,
      style: {
        backgroundOpacity: 0.333,
        height: 125,
        shape: "ellipse",
        width: 125,
      },
    });
    this.props.increaseTaskNodesLength();
    this.refreshLayout();

    return node.data.id;
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

  public addEdgeFromSelectedNodeToGivenNode = (nodeData) => {
    this.setState({ // TODO: use Redux
      isPrimitiveLevelLayoutRefreshBlocked: true,
    });

    const selectedNodeList = this.getSelectedNodes();
    const targetNodeID = this.addNode(nodeData);

    selectedNodeList.forEach((node) => {
      const sourceNodeID = node.id();
      this.addEdge(sourceNodeID, targetNodeID);
    });

    this.refreshLayout();

    this.setState({ // TODO: use Redux
      isPrimitiveLevelLayoutRefreshBlocked: false,
    });

    return targetNodeID;
  }
  /**
   * Json
   */
  public getGraphJSON() {
    return this.cydyna.json();
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

  /*
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
  */

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
