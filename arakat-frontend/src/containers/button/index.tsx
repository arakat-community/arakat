import React from "react";
import ButtonComponent, { IButtonProps } from "../../components/button";

const ButtonContainer: (props: IButtonProps) => JSX.Element = (props: IButtonProps) => ( <ButtonComponent {...props}/>);

export default ButtonContainer;
