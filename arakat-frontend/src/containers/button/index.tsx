import React from "react";
import ButtonComponent, { IButtonProps } from "../../components/button";

const Button: (props: IButtonProps) => JSX.Element = (props: IButtonProps) => ( <ButtonComponent {...props}/>);

export default Button;
