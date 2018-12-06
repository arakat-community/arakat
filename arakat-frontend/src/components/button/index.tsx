import { CircularProgress, Theme, WithStyles, withStyles } from "@material-ui/core";
import MuiButton from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import classNames from "classnames";
import React from "react";
import ButtonType from "../../common/models/button/type";
import { FormattedMessage } from "react-intl";

export interface IButtonProps {
    className?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    isSubmit?: boolean;
    variant?: "raised" | "fab" | "flat" | "outlined";
    label?: string;
    loading?: boolean;
    onClick?: (event: any) => void;
    type: ButtonType;
    children: any;
}

const style: any = (theme: Theme) => ({
    buttonProgress: {
        color: green[500],
        left: "50%",
        margin: -8,
        position: "absolute",
        top: "50%",
    },
    wrapper: {
        position: "relative",
    },
});

type PropWithStyles = IButtonProps & WithStyles<"buttonProgress" | "wrapper">;

const ButtonComponent: React.SFC<IButtonProps> = ({
    classes,
    ...props
}: PropWithStyles) => (
        <div className={classes.wrapper}>
            <MuiButton
                variant={props.variant}
                size={"medium"}
                color={props.type === ButtonType.action ? "primary" : props.type === ButtonType.warning ? "secondary" : "default"}
                className={classNames({
                    [props.className]: props.className && true,
                })}
                type={props.isSubmit ? "submit" : "button"}
                disabled={props.disabled || props.loading}
                onClick={props.onClick}
                fullWidth={props.fullWidth}
            >
                {
                    props.children
                }
                {
                    props.label &&
                    <FormattedMessage
                        id={props.label}
                    />
                }

            </MuiButton>
            {props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
    );

export default withStyles(style, { withTheme: true })(ButtonComponent);
