import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    WithStyles,
} from "@material-ui/core";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import {MessageBoxState, MessageBoxType} from "../../common/models/message-box/type";

export interface IMessageBoxProps {
    onAgree?: () => void;
    onClose: () => void;
    id: string;
    state: MessageBoxState;
    text: JSX.Element;
    title: JSX.Element;
    type: MessageBoxType;
}

export interface IMessageBoxState {
    messageBoxState: MessageBoxState;
}

type AllProps = IMessageBoxProps;

/**
 * message box class that gives user a confirmation or an alert confirmation
 */
class MessageBoxComponent extends Component<IMessageBoxProps, IMessageBoxState> {
    constructor(props: IMessageBoxProps) {
        super(props);

        const { state } = props;
        this.state = {
            messageBoxState: state,
        };
    }

    public componentWillReceiveProps(nextProps: AllProps): void {
        const {messageBoxState} = this.state;
        const {state} = nextProps;
        if (messageBoxState !== state) {
            this.setState({
                messageBoxState: state,
            });
        }
    }

    /**
     * renders output
     */
    public render(): JSX.Element {
        const {messageBoxState} = this.state;
        const {id, title, text, type, onAgree} = this.props;
        return (
            <Dialog
                open={messageBoxState === MessageBoxState.open}
                onClose={this.handleClose}
                aria-labelledby={id}
                aria-describedby={`${id}-description`}
            >
                <DialogTitle id={id}>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id={`${id}-description`}>
                       {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        type === MessageBoxType.confirmation ? (
                            <>
                                <Button onClick={this.handleClose} color="primary">
                                    <FormattedMessage id="dialog.button.cancel" />
                                </Button>
                                <Button onClick={this.handleAgreeAndClose} color="primary" autoFocus={true}>
                                    <FormattedMessage id="dialog.button.agree" />
                                </Button>
                            </>
                        ) : (
                                <Button onClick={this.handleClose} color="primary" autoFocus={true}>
                                    <FormattedMessage id="dialog.button.ok" />
                                </Button>
                            )
                    }
                </DialogActions>
            </Dialog>
        );
    }

    private handleAgreeAndClose = () => {
        this.setState({messageBoxState: MessageBoxState.close}, () => {
            const {onClose, onAgree} = this.props;
            onClose();
            onAgree();
        });
    }

    private handleClose = () => {
        this.setState({messageBoxState: MessageBoxState.close}, () => {
            const {onClose} = this.props;
            onClose();
        });
    }
}

export default MessageBoxComponent;
