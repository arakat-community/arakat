import React from "react";
import {MessageBoxType, MessageBoxState} from "../../common/models/message-box/type";
import {
    WithStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@material-ui/core";
import { FormattedMessage } from "react-intl";

export interface IMessageBoxProps {
    onAgree?: () => void;
    onCancel?:() => void;
    onClose?: () => void;
    id: string;
    state: MessageBoxState;
    text: string;
    title: string;
    type : MessageBoxType;
}

type AllProps = IMessageBoxProps;

const MessageBox : React.SFC <IMessageBoxProps> = (props : AllProps) => (
    <Dialog
        open={props.state === MessageBoxState.open}
        onClose={this.handleClose}
        aria-labelledby={props.id}
        aria-describedby={`${props.id}-description`}>
        <DialogTitle id={props.id}>{props.title}</DialogTitle>
        <DialogContent>
            <DialogContentText id={`${props.id}-description`}>
               {props.text}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            {
                props.type === MessageBoxType.confirmation ? (
                    <>
                        <Button onClick={props.onCancel} color="primary">
                            <FormattedMessage id="dialog.button.cancel" />
                        </Button>
                        <Button onClick={props.onAgree} color="primary" autoFocus>
                            <FormattedMessage id="dialog.button.agree" />
                        </Button>
                    </>
                ) : (
                        <Button onClick={props.onClose} color="primary" autoFocus>
                            <FormattedMessage id="dialog.button.ok" />
                        </Button>
                    )
            }
        </DialogActions>
    </Dialog>
);

export default MessageBox;