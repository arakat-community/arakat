import { Theme, WithStyles, withStyles } from "@material-ui/core";
import React from "react";
import { DraggableType } from "../../common/models/draggable/type";
import Draggable from "../draggable";

const style: any = (theme: Theme) => ({
    root: {
        backgroundColor: '#545C61',
        color: "white",
    },
    nodeIcon : {
        float: 'left',
        marginRight: '10px',
        marginBottom: '10px'
    }
});

export interface IDraggableNodeProps {
    nodeID: string;
    title: string;
    depth: number;
}

type AllProps = IDraggableNodeProps & WithStyles<'root' | 'nodeIcon'>;

const DraggableNodeComponent: React.SFC<AllProps> = ({classes, ...props}: AllProps) => {

    const draggableItem = {
        node_id: props.nodeID,
    };
    
    return (
        <div
            className={classes.root}
            style={{
                paddingLeft: ( props.depth + 2) + "vw",
                paddingTop: '15px'
            }}
        >   
            <img
                src='/assets/images/iconmonstr-circle-1.svg'
                alt="logo"
                className={classes.nodeIcon}
            />           
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
