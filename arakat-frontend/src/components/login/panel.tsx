import {Theme, withStyles, WithStyles} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import {InjectedFormProps, reduxForm } from "redux-form";
import ButtonType from "../../common/models/button/type";
import { isIE } from "../../common/utils/browser-detection";
import Button from "../button";
import FormElement from "../redux/form-element";

const style: any = (theme: Theme) => ({
    [theme.breakpoints.up("lg")]: {
        grid: {
            padding: 50,
        },
        root: {
            alignItems: "center",
            display: !isIE() ? "flex" : "list-item",
            justifyContent: "center",
            minHeight: "100vh",
            minWidth: "24%",
            position: "fixed",
            right: 0,
            top: 0,
            width: "24%",
        },
      },
    [theme.breakpoints.down("md")]: {
        grid: {
            padding: 50,
        },
        root: {
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
        },
      },
});

export interface IAuthenticationForm {
    password: string;
    remember_me: boolean;
    username: string;
    grant_type: string;
}

interface IPanelProps {
    loading: boolean;
    rememberMeChecked?: boolean;
    onRemembermeClicked: (rememberMe: boolean) => void;
}

type PropsWithStyles = IPanelProps & InjectedFormProps<IAuthenticationForm, IPanelProps> & WithStyles <"root" | "grid">;

const validate: any = (values: any) => {
    const errors: any = {};
    if (!values.password) {
        errors.password = <FormattedMessage id="login.error.password.required" />;
    }
    if (!values.username) {
        errors.username = <FormattedMessage id="login.error.username.required" />;
    }

    return errors;
};

/**
 * Login panel component
 */
class Panel extends Component<PropsWithStyles> {

    constructor(props: PropsWithStyles) {
        super(props);

        const {initialize, rememberMeChecked} = props;
        initialize({
            password: "",
            remember_me: rememberMeChecked,
            username: "",
            grant_type: "password",
        });
    }

    /**
     * output of login panel
     */
    public render(): JSX.Element {
        const {classes, invalid, handleSubmit, loading} = this.props;

        return (
            <Paper
                className={classes.root}
            >
                <form
                    onSubmit={handleSubmit}
                    onChange={this.handleFormChanged}
                >
                    <Grid
                        container={true}
                        className={classes.grid}
                    >
                        <Grid
                            item={true}
                            xs={12}
                        >
                            <Typography
                                variant="title"
                                gutterBottom={true}
                            >
                                <FormattedMessage
                                    id="login.title"
                                />
                            </Typography>
                        </Grid>
                        <Grid
                            item={true}
                            xs={12}
                        >
                            <FormElement
                                name="username"
                            >
                                <TextField
                                    fullWidth={true}
                                    label={
                                            <FormattedMessage
                                                id="login.email"
                                            />
                                            }
                                    margin="normal"
                                    required={true}
                                />
                            </FormElement>
                        </Grid>
                        <Grid
                            item={true}
                            xs={12}
                        >
                            <FormElement
                                name="password"
                            >
                                <TextField
                                    fullWidth={true}
                                    label={
                                                <FormattedMessage
                                                    id="login.password"
                                                />
                                            }
                                    margin="normal"
                                    type="password"
                                    required={true}
                                />
                            </FormElement>
                        </Grid>
                        <Grid
                            item={true}
                            xs={12}
                        >
                            <FormElement
                                    name="remember_me"
                                    title={
                                            <FormattedMessage
                                                id="login.remember.me"
                                            />
                                            }
                            >
                                <Checkbox />
                            </FormElement>
                        </Grid>
                        <Grid
                            item={true}
                            xs={12}
                        >
                            <Button
                                label={
                                        <FormattedMessage
                                            id="login.button.login"
                                        />
                                    }
                                type={ButtonType.action}
                                isSubmit={true}
                                disabled={invalid}
                                fullWidth={true}
                                loading={loading}
                            />
                        </Grid>
                    </Grid>
                </form>
            </Paper >
        );
    }

    private handleFormChanged = (event) => {
        const {id} = event.target;
        if (id === "remember_me") {
            const checked: boolean = event.target.checked;
            const {onRemembermeClicked} = this.props;
            if (onRemembermeClicked) {
                onRemembermeClicked(checked);
            }
        }
    }
}

export default reduxForm<IAuthenticationForm, IPanelProps>({
    form: "login", validate,
})(withStyles(style, { withTheme: true })(Panel));
