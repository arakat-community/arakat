import * as React from "react";
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

// context singleton
let context: any;

// tslint:disable-next-line:typedef
const withDragDropContext = <P extends any>(Component: React.ComponentClass<P> | React.StatelessComponent<P>) => {
      // ensure a singleton instance of the context exists
      if (!context) {
        context = DragDropContext<P>(HTML5Backend);
    }

      return context(Component);
 };

export default withDragDropContext;
