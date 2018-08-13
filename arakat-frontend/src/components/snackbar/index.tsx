import { IconButton } from "@material-ui/core";
import MUISnackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import React, { SyntheticEvent } from "react";
import { ExitHandler } from "react-transition-group/Transition";
import { SnackbarType } from "../../common/models/snackbar/type";

export interface ISnackbarProps {
    onExited: ExitHandler;
    id: string;
    message: string;
    state: SnackbarState;
    onClose: (event: SyntheticEvent<any>, reason: string) => void;
    onIconCloseClicked: (event: any) => void;
    type: SnackbarType;
}

/**
 * snackbar state enums that controls snackbar's state on page
 */
export enum SnackbarState {
    open= 1,
    closed= 0,
}

type AllTypes = ISnackbarProps;

const Snackbar: React.SFC<AllTypes> = (props: AllTypes) => (
    <MUISnackbar
          key={props.id}
          anchorOrigin={{
            horizontal: "right",
            vertical: "bottom",
          }}
          open={props.state === SnackbarState.open}
          autoHideDuration={6000}
          onClose={props.onClose}
          onExited={props.onExited}
          ContentProps={{
            "aria-describedby": props.id,
          }}
          message={<span id={props.id}>{props.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={props.onIconCloseClicked}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
);

export default Snackbar;
