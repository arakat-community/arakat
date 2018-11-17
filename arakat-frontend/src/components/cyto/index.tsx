import { 
  Theme, 
  WithStyles, 
  withStyles,
} from "@material-ui/core";
import cytoscape from "cytoscape";
import coseBilkent from "cytoscape-cose-bilkent";
import edgehandles from "cytoscape-edgehandles";
import MouseTrap from "mousetrap";
import React, { Component } from "react";
import { ConnectDropTarget, DropTarget} from "react-dnd";
import { NodeTypes } from "../../common/models/cyto-elements/node-types";
import NodeParametersDialogContainer from "../../containers/node-parameters-dialog";
import { ICytoState } from "../../store/cyto/types";
import { layout } from "./layout";
import { def_style, getBackground, getShape, MAX_ZOOM } from "./style";
import EdgeDialogComponent from '../edge-dialog';
import GraphPropertiesDialogContainer from '../../containers/graph-properties-dialog';
import { DraggableType }  from '../../common/models/draggable/type';

const style: any = (theme: Theme) => ({
  default: {
      height: "100%",
  },
  highlighted: {
      border: "1px solid orange",
      height: "100%",
  },
  playButton: {
      margin: theme.spacing.unit,
      position: 'absolute',
      bottom: '150px',
      right: '5px'
  },
  rightIcon: {
      marginLeft: theme.spacing.unit,
  },
});

export interface ICytoProps {
  parentSelectChangeHandler?: () => void;
  addNodeToExistingNodes: (nodeSpec) => void;
  increaseCVNodesLength: () => void;
  increasePipelineNodesLength: () => void;
  increaseTaskNodesLength: () => void;
  setSelectedNode: (selectedNode) => void;
  setIsNodeParametersDialogOpen: (isDialogOpen: boolean) => void;
  addEdgeToGraphEdges: (key: string, edge: any) => void;
  setGraph: (graph: any) => void;
  saveGraph: (graph: any) => void;
  setGraphProperties: (graphProperties: any) => void;
  edgeAdditionPolicy?: any;
  highlighted?: boolean;
  hovered?: boolean;
  connectDropTarget: ConnectDropTarget; // look at return type, don't make it 'any'
  isOver: boolean;
  dragItem: any;
  didDrop: boolean;
  cytoState: ICytoState; // from props
}

interface ICytoLocalState {
  edgeDialogPropObject: {
    isEdgeDialogOpen: boolean,
    commonEdgeTypes: any[],
    sourceID: string,
    targetID: string
  }
}

const nodeTarget = {
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

type PropsAndStyle = ICytoProps & WithStyles< "default" | "highlighted" | 'playButton' | 'rightIcon'>;
/**
 * CytoGraph Class
 */
class CytoGraph extends Component<PropsAndStyle, ICytoLocalState, ICytoState > {

  private cydyna: any;

  constructor(props: PropsAndStyle) {
    super(props);
    this.state = {
        edgeDialogPropObject: {
          isEdgeDialogOpen: false,
          commonEdgeTypes: [],
          sourceID: '',
          targetID: ''
        }
    }
    this.removeSelectedElements = this.removeSelectedElements.bind(this);
    this.removeElement = this.removeElement.bind(this);

    // coseBilkent register extension
    cytoscape.use( coseBilkent );
    // edgehandles register extension
    cytoscape.use( edgehandles );
    
  }

  public componentDidMount() {
    this.createGraph();
    this.addEventHandlers();
    MouseTrap.bind(["del", "backspace"], this.removeSelectedElements);
  }

  public componentWillReceiveProps(nextProps) {
    if (!this.props.didDrop && nextProps.didDrop) {
      nextProps.cytoState.nodeSpecs.map((nodeSpec) => {
        // TODO: dragItem.node_id should be int.
        if (nodeSpec.node_id === parseInt(nextProps.dragItem.node_id, 10)) {
          this.props.addNodeToExistingNodes(nodeSpec);
          let isAlreadyExist = false;
          if( this.cydyna.elements ) {
            isAlreadyExist = this.cydyna._private.elements.some((existingNode) => {
                return existingNode._private.data.nodeID === nodeSpec.node_id;                                     
            })
          }            
          if( !isAlreadyExist ) {
            this.addNode(nodeSpec);
          }
          return;
        }
      });
    }

  }
  public componentDidUpdate = () => {
    if( this.props.cytoState.graphProperties ) {
      const graphNodes = this.props.cytoState.graphNodes;
      const graphEdges = this.props.cytoState.graphEdges;
      const graphProperties = this.props.cytoState.graphProperties;
      const graph = {
        graph: {
          nodes: graphNodes,
          edges: graphEdges,
        },
        dag_properties: graphProperties
      }
      let existingTaskNodes = [];
      this.cydyna._private.elements.map((element) => {
        if (element._private.data.nodeType === NodeTypes.taskNode) {
          graph.graph.nodes[element._private.data.id] = {
            id: element._private.data.id,
            parent: null,
            node_type: NodeTypes.taskNode
          }
        }
      })
      this.props.setGraph(graph);
      this.props.saveGraph(graph);
      this.props.setGraphProperties(undefined);
    }
  }
  /*
  public componentWillUnmount() {
    MouseTrap.unbind(["del", "backspace"], this.removeSelectedElements());
  }
  */

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
      handleColor: "green",
      handleIcon: false,
      handleNodes: "node",
      handleSize: 10,
      noEdgeEventsInDraw: true,
      preview: false,
      toggleOffOnLeave: true,
      handleInDrawMode: true,
    });

    this.refreshLayout();
  }

  public getNodeFromExistingNodes = (nodeID) => {
      const existingNodes = this.props.cytoState.existingNodes;
      let selectedNode = {};
      existingNodes.map((node) => {
        if (node.node_id === nodeID) {          
              selectedNode = node;
        }
      });
      return selectedNode;
  }

  public getNodesCommonParentType = (sourceNode, targetNode) => {
    if( sourceNode._private.data.parentNodeType === targetNode._private.data.parentNodeType) {
      return sourceNode._private.data.parentNodeType;
    } else {
      return undefined;
    }
  }

  public areTheyInSameParent = (sourceNode, targetNode) => {
    if( sourceNode._private.data.parent === targetNode._private.data.parent ) {
        return true;
      }
  }

  public addEventHandlers = () => {
    // this.cydyna.on("select", this.nodeSelect);
    this.cydyna.on("cxttap", "node", (evt) => {
      // TODO: evt.target's index:0 is in infinite loop!
      const nodeID = evt.target._private.data.nodeID;            
      const selectedNode = this.getNodeFromExistingNodes(nodeID);
      selectedNode['id'] = evt.target._private.data.id;
      selectedNode['parent'] = evt.target._private.data.parent;
      if (selectedNode['node_id'] >= 0) {
        this.props.setSelectedNode(selectedNode);
        this.props.setIsNodeParametersDialogOpen(true);
      }      
    });
    this.cydyna.on('ehcomplete', (event, sourceNode, targetNode, addedEles) => {
      const sourceNodeID = sourceNode._private.data.nodeID;
      const targetNodeID = targetNode._private.data.nodeID;
      const sourceNodeSpec = this.getNodeFromExistingNodes(sourceNodeID);
      const targetNodeSpec = this.getNodeFromExistingNodes(targetNodeID);
      const sourceNodeFamily = sourceNodeSpec["family"];
      const targetNodeFamily = targetNodeSpec["family"];

      
      let edgeType = '';
      if( this.areTheyInSameParent(sourceNode, targetNode) ) {
        let parentNodeType = this.getNodesCommonParentType(sourceNode, targetNode);
        switch( parentNodeType ) {
          case NodeTypes.pipelineNode:
            edgeType = 'pipeline';
            break;
          case NodeTypes.cvNode:
            edgeType = 'cv';
            break;          
          case NodeTypes.taskNode:
            break;
          case undefined: // means both are task nodes.
            edgeType = 'upstream';
            break;
        }                          
      } else if ( targetNode._private.data.nodeID !== 70 ) { // modelHolder Node
        edgeType = 'wrong';
      }
      let commonEdgeTypes = [];
      if( edgeType === '' ) {
        commonEdgeTypes = this.getCommonEdgeTypes(sourceNodeFamily, targetNodeFamily);
        const sourceID = addedEles[0]._private.data.source;
        const targetID = addedEles[0]._private.data.target;
        if( commonEdgeTypes.length === 0 ) {
            edgeType = 'wrong';
        } else if( commonEdgeTypes['additional_parameters'] || commonEdgeTypes.length > 1) {
            this.setState({
              edgeDialogPropObject: {
                isEdgeDialogOpen: true,
                commonEdgeTypes,
                sourceID,
                targetID
              }
            })
        } else {
          this.addEdgeToGraphEdges(commonEdgeTypes[0], sourceID, targetID);
        }
      }
      if( edgeType === 'wrong' ) {
        this.removeLastEdge(addedEles);
      } 
      // TODO: remove edge if not okay
    
    })
  }

  public addEdgeToGraphEdges = (edge, sourceID, targetID) => {
      let key = `${sourceID}-${targetID}`;
      this.props.addEdgeToGraphEdges(key, edge);  
      this.clearStatesAboutEdgeDialog();
  }

  public removeLastEdge = (addedEles) => {
      addedEles[addedEles.length - 1].remove();
      this.clearStatesAboutEdgeDialog();
  }

  public clearStatesAboutEdgeDialog = () =>  {
    this.setState({
      edgeDialogPropObject: {
        isEdgeDialogOpen: false,
        commonEdgeTypes: [],
        sourceID: '',
        targetID: ''
      }
    })
  }
  public getCommonEdgeTypes = (sourceNodeFamily, targetNodeFamily) => {
    const sourceProduces = this.props.cytoState.edgePermissions.edge_permissions[sourceNodeFamily]["produces"];
    const targetTakes = this.props.cytoState.edgePermissions.edge_permissions[targetNodeFamily]["takes"];
    let commonEdgeTypes = [];
    if( sourceProduces.length > 0 && targetTakes.length > 0 ) {
        sourceProduces.map(( sourceElement ) => {
          targetTakes.map(( targetElement ) => {
            let temporaryCommonEdgeType = {};
            let additionalParameters = [];
            if( sourceElement['type'] === targetElement['type']) {
                temporaryCommonEdgeType['type'] = sourceElement['type']
                if( sourceElement['additional_parameters'] ) {
                  sourceElement['additional_parameters'].map((additional) => {
                    additionalParameters.push(additional);
                  });
                }
                if (targetElement['additional_parameters'] ) {
                  targetElement['additional_parameters'].map((additional) => {
                    additionalParameters.push(additional);
                  });
                }
                /*           
                if( sourceElement['type'] === 'dataframe' ) {
                 // TODO: later.
                  temporaryCommonEdgeType['compatibility'] = [];
                  sourceElement['compatibility'].map((sourceCompatibility) => {
                    targetElement['compatibility'].map((targetCompatibility) => {
                      if( sourceCompatibility === targetCompatibility ) {
                          temporaryCommonEdgeType['compatibility'].push(sourceCompatibility);
                      }
                    })
                  })
                }
                */          
            }
            if( temporaryCommonEdgeType['type'] ) {
              if( additionalParameters.length > 0 ) {
                temporaryCommonEdgeType['additional_parameters'] = additionalParameters;
              }
              commonEdgeTypes.push(temporaryCommonEdgeType);
            }
          })
        });
    }    
    return commonEdgeTypes;     
  }
  /*
  public nodeSelect = () => {
    // alert("node selected.");
  }
  */

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

  public isNodeAdditionAllowed = (nodeSpec, parent) => {
    let isAllowed = true;
    if( parent.nodeType === 2 && nodeSpec.compatible_with_spark_pipeline === false) {
      isAllowed = false;
    } else if( parent.nodeType === 3 && ( nodeSpec.family !== 6 || 
                                          nodeSpec.family !== 7 ) ) {
      isAllowed = false;                                    
    }
    return isAllowed;

  }

  public addNode = (nodeSpec) => {
    let parent = this.getParentDroppedInto();
    if (parent.id === -1) {
       const taskNode = this.prepareTaskNodeData();
       parent.id = this.addTaskNode(taskNode);
       parent.nodeType = NodeTypes.taskNode;
    }
    let nodeID = -1;
    const nodeOffset = this.props.cytoState.lastDroppedNodeOffset;
    const existingNodesLength = this.props.cytoState.existingNodes ?
                                this.props.cytoState.existingNodes.length + 1 :
                                1;
                                
    const nodeData = {
        id: `node${existingNodesLength}`,
        nodeID: nodeSpec.node_id,
        nodeType: nodeSpec.node_type,
        parent: parent.id,
        parentNodeType: parent.nodeType,
        visibleName: nodeSpec.name,
    };
    if( this.isNodeAdditionAllowed(nodeSpec, parent) ) {
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
      this.refreshLayout();
      return nodeID;      
    } else {
      alert('not allowed.')
    }
    
  }

  public getParentDroppedInto = () => {
    const nodeOffset = this.props.cytoState.lastDroppedNodeOffset;
    let parent = {
      id: -1,
      nodeType: -1
    }
    const elements = this.cydyna._private.elements;
    if (elements.length > 0) {
      if (this.props.cytoState.cvNodesLength > 0) {
        parent = this.searchInSpesificParentNodeGroup(elements, NodeTypes.cvNode, nodeOffset);
      }
      if (parent.id === -1 && this.props.cytoState.pipelineNodesLength > 0) {
        parent = this.searchInSpesificParentNodeGroup(elements, NodeTypes.pipelineNode, nodeOffset);
      }
      if (parent.id === -1 && this.props.cytoState.taskNodesLength > 0) {
        parent = this.searchInSpesificParentNodeGroup(elements, NodeTypes.taskNode, nodeOffset);
      }
    }
    return parent;
  }

  public searchInSpesificParentNodeGroup = (elements, nodeType, nodeOffset) => {
    let parent = {
      id: -1,
      nodeType: -1
    }
    elements.map((element) => {
      if (element._private.data.nodeType === nodeType) {
          const parentBoundingBox = element.boundingBox();
          if (this.isNodeInBoundingBox( nodeOffset, element, parentBoundingBox )) {
            parent.id = element._private.data.id;
            parent.nodeType = element._private.data.nodeType;
            return parent;
          }
      }
    });
    return parent;
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
          color: "white",
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
            color: "white",
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
            height: 75,
            shape: "rectangle",
            width: 150,
            color: "white",
          },
        })
        .id();
    this.props.increaseCVNodesLength();
    return nodeID;
  }
  public prepareTaskNodeData = () => {
    let id = "task";
    let visibleName = "Task node ";
    if
    (
      this.props.cytoState.taskNodesLength &&
      this.props.cytoState.taskNodesLength > 0
    ) {
        id += `${this.props.cytoState.taskNodesLength}`;
        visibleName += `${this.props.cytoState.taskNodesLength + 1}`;
    } else {
        id += "0";
        visibleName += "1";
    }
    return {
        data: {
          id,
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
        color: "white",
      },
    });
    this.props.increaseTaskNodesLength();
    this.refreshLayout();

    return node.data.id;
  }

  public addEdge = (sourcenodeID, targetnodeID) => {
    const edgeID = this.cydyna
      .add({
        data: {
          source: sourcenodeID,
          target: targetnodeID,
        },
        group: "edges",
      })
      .id();

    this.refreshLayout();

    return edgeID;
  }

  // TODO: is this necessary?
  public addEdgeFromSelectedNodeToGivenNode = (nodeData) => {
    /*
    this.setState({ // TODO: use Redux
      isPrimitiveLevelLayoutRefreshBlocked: true,
    });
    */

    const selectedNodeList = this.getSelectedNodes();
    const targetnodeID = this.addNode(nodeData);

    selectedNodeList.forEach((node) => {
      const sourcenodeID = node.id();
      this.addEdge(sourcenodeID, targetnodeID);
    });

    this.refreshLayout();
    /*
    this.setState({ // TODO: use Redux
      isPrimitiveLevelLayoutRefreshBlocked: false,
    });
    */

    return targetnodeID;
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

  public setNodeStyle = (nodeID, nodeStyle) => {
    this.cydyna.$id(nodeID).style(nodeStyle);
  }

  public getNodeParametersDialogComponent = () => {
    return (
      <NodeParametersDialogContainer/>
    );
  }

  public getEdgeDialogComponent = () => {
    return (
      <EdgeDialogComponent
        isDialogOpen={this.state.edgeDialogPropObject.isEdgeDialogOpen}
        commonEdgeTypes={this.state.edgeDialogPropObject.commonEdgeTypes}
        sourceID={this.state.edgeDialogPropObject.sourceID}
        targetID={this.state.edgeDialogPropObject.targetID}
        addEdgeToGraphEdges={this.addEdgeToGraphEdges}
      />
    );
  }

  public getGraphPropertiesDialogComponent = () => {
    return (
      <GraphPropertiesDialogContainer
      />
    )
  }
  /**
   * render output of cyto
   */
  public render(): JSX.Element {
    const { classes, connectDropTarget } = this.props;
    return (
        connectDropTarget(
          <div
              className={classes.default}
              id="cydyna"
          >
            {this.getNodeParametersDialogComponent()}
            {this.getEdgeDialogComponent()}
            {this.getGraphPropertiesDialogComponent()}
          </div>,
        )
        
    );
  }
}

const droppableCytoGraph = DropTarget(DraggableType.Node, nodeTarget, collect)(CytoGraph);
export default withStyles(style, {withTheme: true})(droppableCytoGraph);

// export default CytoGraph;
