import React, { Component } from "react";
import { ConnectDragSource, DragSource, DragSourceConnector, DragSourceMonitor } from "react-dnd";
import { IVisualizationConfiguration } from "../../common/models/visualization/config";

const draggableSource: any = {
  beginDrag: (props: IDraggableComponentProps) => {
    return props.component;
  },
  endDrag: (props: IDraggableComponentProps, monitor: DragSourceMonitor) => {
    // const item = monitor.getItem()
    // const dropResult = monitor.getDropResult()

    // if (dropResult) {
    // 	alert(`You dropped ${item.name} into ${dropResult.name}!`)
    // }
  },
};

export interface IDraggableComponentProps {
  connectDragSource?: ConnectDragSource;
  component: any;
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
        const { connectDragSource  } = this.props;

        return (
            connectDragSource  &&
            connectDragSource(
                <div>
                    {this.props.children}
                </div>,
            )
        );
    }
}

export default DragSource<IDraggableComponentProps>(
            (props) => props.type,
            draggableSource,
            (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
                connectDragSource: connect.dragSource(),
                isDragging: monitor.isDragging(),
            }),
        )(DraggableComponent);
