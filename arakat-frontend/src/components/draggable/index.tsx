import React, { Component } from "react";
import { ConnectDragSource, DragSource, DragSourceConnector, DragSourceMonitor } from "react-dnd";

const draggableSource: any = {
  beginDrag: (props: IDraggableComponentProps) => {

        return props.item;
  },
  isDragging: (props: IDraggableComponentProps) => {
    //console.log("draggableSource -> Dragging...");
  },
  endDrag: (props: IDraggableComponentProps, monitor: DragSourceMonitor) => {
        if ( !monitor.didDrop() ) {
            return;
        }
        const item = monitor.getItem();
        // const dropResult = monitor.getDropResult();
  },
};

const collect = (connect, monitor) => {
    return {
       isDragging: monitor.isDragging(),
       connectDragSource: connect.dragSource(),
    };
};

export interface IDraggableComponentProps {
  connectDragSource?: ConnectDragSource;
  item: any;
  isDragging?: boolean;
  type: string;
}

/**
 * draggable component
 */
class DraggableComponent extends Component<IDraggableComponentProps> {
    /**
     * render output
     */
    public render(): JSX.Element {
        const { connectDragSource, isDragging } = this.props;

        return (
            connectDragSource &&
            connectDragSource(
                <div>
                    {this.props.children}
                </div>,
            )
        );
    }
}
/*
export default DragSource<IDraggableComponentProps>(
            (props) => props.type,
            draggableSource,
            (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
                connectDragSource: connect.dragSource(),
                isDragging: monitor.isDragging(),
            }),
        )(DraggableComponent);
*/

export default DragSource<IDraggableComponentProps>(
    (props) => props.type, draggableSource, collect)
    (DraggableComponent);
