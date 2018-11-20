import {Chip, Grid, Theme, WithStyles, withStyles} from "@material-ui/core";
import React from "react";
import { DraggableType } from "../../common/models/draggable/type";
import Draggable from "../draggable";

const style: any = (theme: Theme) => ({
    root: {
        fontSize: "1.25rem",
        backgroundColor: theme.palette.background.default,
        color: "white",
        paddingTop: "8px",
    },
});

export interface IDraggableNodeProps {
    nodeID: string;
    title: string;
    depth: number;
}
/*
export interface IDraggableNodesProps {
    chips: IDraggableNode[];
}
*/
type AllProps = IDraggableNodeProps & WithStyles<"root">;

// TODO: type, component and key props of Draggable component may be unnecessary ?
const DraggableNodeComponent: React.SFC<AllProps> = ({classes, ...props}: AllProps) => {

    const draggableItem = {
        node_id: props.nodeID,
    };
    return (
        <div
            className={classes.root}
            style={{
                paddingLeft: ( props.depth + 2) * 2 + "vw",
            }}
        >
            <Draggable
                type={DraggableType.Node}
                item={draggableItem}
                key={`draggable-${props.nodeID}`}
            >
                <span> {props.title}</span>
            </Draggable>
        </div>

    );
};

export default withStyles(style, {withTheme: true})(DraggableNodeComponent);
