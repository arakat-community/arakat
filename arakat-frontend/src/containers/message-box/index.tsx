import React from "react";
import MessageBoxComponent, { IMessageBoxProps } from "../../components/message-box";

const MessageBox: (props: IMessageBoxProps) => JSX.Element = (props: IMessageBoxProps) => ( <MessageBoxComponent {...props}/>);

export default MessageBox;
