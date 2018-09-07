import React from "react";
import NestedComponent, { INestedProps } from "../../components/nestedlist";

const NestedList: (props: INestedProps) => JSX.Element = (props: INestedProps) => ( <NestedComponent {...props}/>);

export default NestedList;
