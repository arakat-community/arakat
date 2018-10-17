import React from "react";
import DialogComponent, { IDialogProps } from "../../components/dialog";

const DialogContainer: (props: IDialogProps) => JSX.Element = (props: IDialogProps) => ( <DialogComponent {...props}/>);

export default DialogContainer;
