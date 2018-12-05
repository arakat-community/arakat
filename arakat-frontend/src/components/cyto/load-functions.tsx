import { 
    def_style, 
    getBackground, 
    getShape, 
    MAX_ZOOM, 
    taskNodeStyle, 
    cvNodeStyle, 
    innerNodeStyle,
    pipelineNodeStyle
  } from "./style";
import { NodeTypes } from "../../common/models/cyto-elements/node-types";

export const getCytoReadableGraphObject = (loadedGraph) => {
    console.log('loadedGraph: ');
    console.log(loadedGraph);
    let cytoReadableGraphObject = {
        nodes: prepareNodes(loadedGraph.graph.nodes),
        edges: prepareEdges(loadedGraph.graph.edges)
    }
    console.log('cytoReadableGraphObject: ');
    console.log(cytoReadableGraphObject);
    return cytoReadableGraphObject;
}

const prepareNodes = (nodes) => {
    let taskNodesLength = 0;
    let cytoReadableNodes = [];
    for( let key in nodes ) {
        let nodeData = {};
        if( nodes[key].node_id ) {
            console.log('parent: !! ' + nodes[key]['parent']);
            nodeData = {
                data: {
                    id: key,
                    nodeID: nodes[key]['node_id'],
                    nodeType: nodes[key]['node_type'],
                    parent: nodes[key]['parent'],
                    parentNodeType: findNodeParentType(nodes, key),
                    visibleName: nodes[key]['name']
                },
                group: "nodes",
                style: innerNodeStyle,
            }
        } else { // if task node
            taskNodesLength++;
            nodeData = {
                data: {
                    id: key,
                    nodeType: 1,
                    parent: 'none',
                    visibleName: `İş Nodu ${taskNodesLength}`
                    // TODO: not İş Nodu, make it via <FormattedMessage
                }                
            }
        }
        let style = undefined;
        switch( nodes[key]['node_type'] ) {
            case NodeTypes.innerNode:
                style = innerNodeStyle;
                break;
            case NodeTypes.pipelineNode:
                style = pipelineNodeStyle;
                break;
            case NodeTypes.cvNode:
                style = cvNodeStyle;
                break;
            case NodeTypes.taskNode:
                style = taskNodeStyle;
                break;
        }
        nodeData['style'] = style;
        cytoReadableNodes.push(nodeData);
    }
    return cytoReadableNodes;
}

const prepareEdges = (edges) => {
    let cytoReadableEdges = [];
    for( let key in edges ) {
        const nodes = key.split('-');
        cytoReadableEdges.push({
            data: {
                id: `${nodes[0]}${nodes[1]}`,
                source: `${nodes[0]}`,
                target: `${nodes[1]}`
            }
        });
    }
    return cytoReadableEdges;
}   

const findNodeParentType = (nodes, childKey) => {
    let parentNodeType = 1; // default
    for( let key in nodes ) {
        if( key === nodes[childKey]['parent'] ) {
            parentNodeType = nodes[key]['node_type'];
        }
    }
    return parentNodeType;
} 
