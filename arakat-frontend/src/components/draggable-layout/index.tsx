import { Theme, WithStyles, withStyles } from "@material-ui/core";
import React from "react";
import RGL, {Layout, Responsive as ResponsiveGridLayout, ResponsiveProps, WidthProvider } from "react-grid-layout";
import "./style.css";
// tslint:disable-next-line:max-line-length
// const ReactGridLayout: React.ComponentClass<RGL.ReactGridLayoutProps & RGL.WidthProviderProps, React.ComponentState> = WidthProvider(RGL);
// tslint:disable-next-line:max-line-length
const ReactGridLayout: React.ComponentClass<ResponsiveProps & RGL.WidthProviderProps, React.ComponentState> = WidthProvider(ResponsiveGridLayout);

const style: any = (theme: Theme) => ({
    "@global": {

    },
});

export interface IDraggableLayout {
    children: any;
    layout: Layout[];
    onLayoutChange?: () => void;
}

type AllType = IDraggableLayout & WithStyles;

const DraggableLayout: React.SFC<AllType> = (props: AllType) => (
    <div
        style={{
            width: "100%",
            height: "100vh",
        }}
    >
        <ReactGridLayout
            verticalCompact={false}
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
            draggableCancel={".discard-drag-and-drop"}
            onDrag={onDrag}
            measureBeforeMount={true}
            // onLayoutChange={layoutChange}
        >
            {props.children}
        </ReactGridLayout>
    </div>
);

const layoutChange: any = (layout: Layout) => {
    console.log(layout);
};

// tslint:disable-next-line:typedef
const onDrag = (layout, oldItem, newItem, placeholder, e, element) => {
    // tslint:disable-next-line:typedef
    const grid = document.getElementsByClassName("react-grid-layout")[0];
    // tslint:disable-next-line:typedef
    const translateXMaxValue = grid.offsetWidth - element.offsetWidth;
    // tslint:disable-next-line:typedef
    const translateYMaxValue = grid.offsetHeight - element.offsetHeight;
// tslint:disable-next-line:typedef
    const translateValues = window.getComputedStyle(element).transform.split(",");
    // tslint:disable-next-line:typedef
    // tslint:disable-next-line:radix
    let translateX: any = parseInt(translateValues[translateValues.length - 2]);
    // tslint:disable-next-line:typedef
    // tslint:disable-next-line:radix
    let translateY: any = parseInt(translateValues[translateValues.length - 1].slice(0, -1));

    if (translateX > translateXMaxValue) {
        translateX = translateXMaxValue;
    }
    if (translateX < 0) {
        translateX = 0;
    }
    if (translateY > translateYMaxValue) {
        translateY = translateYMaxValue;
    }
    if (translateY < 0) {
        translateY = 0;
    }
    // tslint:disable-next-line:max-line-length
    // console.log(`translateY:${translateY},translateYMaxValue:${translateYMaxValue},grid.offsetHeight:${grid.offsetHeight},element.offsetHeight:${element.offsetHeight}`);

    element.style.transform = `translate(${translateX}px, ${translateY}px)`;
};

export default withStyles(style, {withTheme: true})(DraggableLayout);
