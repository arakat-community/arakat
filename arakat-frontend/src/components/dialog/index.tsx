import {
    AppBar,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Toolbar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { DialogState } from "../../common/models/dialog/state";
import { FormState } from "../../common/models/form-state/index";
import { FormattedMessage } from "react-intl";

export interface IDialogProps {
    loading?: boolean;
    onSave?: () => void;
    onClose: () => void;
    id: string;
    formState?: FormState;
    state: DialogState;
    content?: JSX.Element;
    title?: string;
    fullScreen?: boolean;
}

export interface IDialogState {
    dialogState: DialogState;
}

type AllProps = IDialogProps;

const DialogComponent: React.SFC<AllProps> = (props: AllProps) => {
    const { onClose, id, state, content, title, fullScreen } = props;

    return (
        <Dialog
            fullScreen={fullScreen}
            open={state === DialogState.open}
            onClose={onClose}
            aria-labelledby={id}
            aria-describedby={`${id}-description`}
        >
            <AppBar style={{ position: "relative", flexDirection: "row-reverse" }}>
                <Toolbar>
                    <IconButton onClick={onClose}>
                        <CloseIcon></CloseIcon>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogTitle
                id={id}
            >
                {
                    title &&
                    <FormattedMessage
                        id={title}
                    />
                }
            </DialogTitle>

            <DialogContent>
                <DialogContentText
                    id={`${id}-description`}
                >
                </DialogContentText>
                {content}
            </DialogContent>
        </Dialog>
    );
};

export default DialogComponent;
