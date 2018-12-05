import { Theme, WithStyles, withStyles } from "@material-ui/core";
import React from "react";
import { DraggableType } from "../../common/models/draggable/type";
import Draggable from "../draggable";

const style: any = (theme: Theme) => ({
    root: {
        fontSize: "1.25rem",
        backgroundColor: theme.palette.background.default,
        paddingTop: "8px",
    },
    draggableDiv : {

    }
});

export interface IDraggableNodeProps {
    nodeID: string;
    title: string;
    depth: number;
}

type AllProps = IDraggableNodeProps & WithStyles<"root">;

const DraggableNodeComponent: React.SFC<AllProps> = ({classes, ...props}: AllProps) => {

    const draggableItem = {
        node_id: props.nodeID,
    };
    return (
        <div
            className={classes.root}
            style={{
                paddingLeft: ( props.depth + 2) * 2 + "vw",
                paddingTop: '15px'
            }}
        >
            <Draggable
                type={DraggableType.Node}
                item={draggableItem}
                key={`draggable-${props.nodeID}`}
            >
                <span> {props.title} </span>
            </Draggable>
        </div>

    );
};

export default withStyles(style, {withTheme: true})(DraggableNodeComponent);
