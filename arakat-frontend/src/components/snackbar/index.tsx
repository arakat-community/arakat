import { IconButton, Theme, WithStyles, withStyles } from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import MUISnackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import classNames from "classnames";
import React, { SyntheticEvent } from "react";
import { FormattedMessage } from "react-intl";
import { ExitHandler } from "react-transition-group/Transition";
import { SnackbarType } from "../../common/models/snackbar/type";

const style: any = (theme: Theme) => ({
  error: {
    backgroundColor: theme.palette.error[theme.palette.type],
    color: theme.palette.text.primary,
   },
  info: {
    backgroundColor: theme.palette.primary[theme.palette.type],
    color: theme.palette.text.primary,
  },
  success: {
    backgroundColor: green[600],
    color: theme.palette.text.primary,
  },
});

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

type AllTypes = ISnackbarProps & WithStyles<"error" |"success"|"info">;

const Snackbar: React.SFC<AllTypes> = (props: AllTypes) => (
    <MUISnackbar
          key={props.id}
          anchorOrigin={{
            horizontal: "center",
            vertical: "bottom",
          }}
          open={props.state === SnackbarState.open}
          autoHideDuration={6000}
          onClose={props.onClose}
          onExited={props.onExited}
          ContentProps={{
            "aria-describedby": props.id,
            "classes": {
              root: classNames({
                [props.classes.success]: props.type === SnackbarType.success,
                [props.classes.info]: props.type === SnackbarType.info,
                [props.classes.error]: props.type === SnackbarType.error,
              }),
            },
          }}
          message={<span id={props.id}><FormattedMessage id={props.message}/></span>}
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

export default withStyles(style)(Snackbar);
