/**
 * detecting if a browser is ie or edge
 * note: this file is not written in typescript due to documentMode and StyleMedia props!
 */
export const isIE = () => {
    const isIEBrowser = /*@cc_on!@*/false || !!document.documentMode;
    const isEdge = !isIEBrowser && !!window.StyleMedia;
    return isIEBrowser || isEdge;
};
