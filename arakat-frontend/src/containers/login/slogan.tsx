import React from "react";
import SloganComponent, { ISloganProps } from "../../components/login/slogan";

const Slogan: (props: ISloganProps) => JSX.Element = (props: ISloganProps) => ( <SloganComponent {...props}/>);

export default Slogan;
