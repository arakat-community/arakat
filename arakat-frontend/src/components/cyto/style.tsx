export const def_style =
[
        {
          // grabbable: true,
          // grabbed: false,
          // locked: false,
          selectable: true,
          // selected: false,
          selector: "node",
          style: {
            content: "data(visibleName)",
            backgroundColor: 'black'
          },
        },
        {
          selector: "edge",
          style: {
            "curve-style": "bezier",
            "target-arrow-shape": "triangle",
          },
        },
        {
          selector: ".eh-handle",
          style: {
            "background-color": "red",
            "border-opacity": 0,
            "border-width": 12,
            "height": 12,
            "overlay-opacity": 0,
            "shape": "ellipse",
            "width": 12,
          },
        },
        {
          selector: ".eh-hover",
          style: {
            "background-color": "red",
          },
        },
        {
          selector: ".eh-source",
          style: {
            "border-color": "red",
            "border-width": 2,
          },
        },
        {
          selector: ".eh-target",
          style: {
            "border-color": "black",
            "border-width": 2,
          },
        },
        {
          selector: ".eh-preview, .eh-ghost-edge",
          style: {
            "background-color": "red",
            "line-color": "red",
            "source-arrow-color": "red",
            "target-arrow-color": "red",
          },
        },
        {
          selector: ".eh-ghost-edge.eh-preview-active",
          style: {
            opacity: 0,
          },
        },
        {
          selector: ":parent",
          style: {
            "background-opacity": 0.333,
            "grabbable": true,
            "grabbed": false,
            "height" : 500,
            "locked": false,
            "removed": false,
            "selectable": true,
            "selected": false,
            "shape" : "rectangle",
            "style": {
              content: "data(visibleName)",
            },
            "width" : 500,
          },
        },
        {
          selector: "edge:selected",
          style: {
            "background-color": "black",
            "line-color": "black",
            "source-arrow-color": "black",
            "target-arrow-color": "black",
          },
        },
];
const cytoFontFamily = "Lemon Milk, Sans-Serif";
export const taskNodeStyle = {
    fontFamily: cytoFontFamily,
    backgroundOpacity: 0.777,
    backgroundColor: 'white',
    height: 125,
    shape: "ellipse",
    width: 125,
    color: "black",
    fontWeight: 'bold',
}

export const cvNodeStyle = {
    fontFamily: cytoFontFamily,
    backgroundColor: "#ccaaa1",
    backgroundOpacity: 0.555,
    height: 75,
    shape: "rectangle",
    width: 150,
    color: "black",
}

export const innerNodeStyle = {
    fontFamily: cytoFontFamily,
    backgroundColor: "#E75050",
    height: 50,
    shape: "ellipse",
    width: 50,
    color: "black",
}

export const pipelineNodeStyle = {
    fontFamily: cytoFontFamily,
    backgroundColor: "#9eb0ff",
    backgroundOpacity: 0.555,
    height: 100,
    shape: "rectangle",
    width: 175,
    color: "black",
}
export const MAX_ZOOM = 6;

export const getBackground = (ele) => {
    if (ele.data("nodeType") === "DATASOURCE") {
      if (ele.selected()) {
        return "black";
      } else {
        return "#E64A19";
      }

    } else {
      if (ele.selected()) {
        return "black";
      } else {
        return "#1565C0";
      }
    }
};

export const getShape: any = (ele) => {

    if (ele.data("nodeType") === "DATASOURCE") {
        return "heptagon";
    } else if (ele.data("nodeType") === "PARENT") {
      return "rectangle";
    }

    return "ellipse";
};
