import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import ButtonType from "../../common/models/button/type";
import { ButtonVariant } from "../../common/models/button/variant";
import { DialogState } from "../../common/models/dialog/state";
import { FormState } from "../../common/models/form-state/index";
import Button from "../button";

export interface IDialogProps {
  loading?: boolean;
  onSave: () => void;
  onClose: () => void;
  id: string;
  formState: FormState;
  state: DialogState;
  content: JSX.Element;
  title: JSX.Element;
  fullScreen?: boolean;
}

export interface IDialogState {
  dialogState: DialogState;
}

type AllProps = IDialogProps;

const DialogComponent: React.SFC<AllProps> = (props: AllProps) => {
  const {
    loading,
    onSave,
    onClose,
    id,
    formState,
    state,
    content,
    title,
    fullScreen
  } = props;

  return (
    <Dialog
      fullScreen={fullScreen}
      open={state === DialogState.open}
      onClose={onClose}
      aria-labelledby={id}
      aria-describedby={`${id}-description`}
    >
      <DialogTitle id={id}>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText id={`${id}-description`}>
          {content}
          {/*dialog un ekleneceği kısım*/}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          // variant = { ButtonVariant.flat }
          onClick={onClose}
          label={<FormattedMessage id="dialog.button.cancel" />}
          type={ButtonType.action}
        />
        <Button
          // variant = { ButtonVariant.flat }
          onClick={onSave}
          disabled={formState === FormState.invalid}
          loading={loading}
          label={<FormattedMessage id="dialog.button.agree" />}
          type={ButtonType.action}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
