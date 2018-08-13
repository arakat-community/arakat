import React from "react";
import ContentComponent, { IContentProps } from "../../components/content";

const Content: (props: IContentProps) => JSX.Element = (props: IContentProps) => ( <ContentComponent {...props}/>);

export default Content;
