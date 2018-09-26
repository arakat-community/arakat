import { Grid, MenuItem, Select, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { InjectedFormProps, reduxForm } from "redux-form";
import isEmail from "validator/lib/isEmail";
import { IUserRole } from "../../common/models/authentication/user-role";
import LocalizationLanguages from "../../localization/languages";
import FormElement from "../redux/form-element";

interface IUserRoleInfoProps {
    userRole?: IUserRole;
}

type AllProps = IUserRoleInfoProps & InjectedFormProps<IUserRole, IUserRoleInfoProps>;

/**
 * validates form values and gives apporiate error message
 * @param values form values
 */
const validate: any = (values: IUserRole) => {
    const errors: any = {};
    if (!values.role) {
        errors.role = <FormattedMessage id="form.elements.error.required" />;
    }
    if (!values.description) {
        errors.description = <FormattedMessage id="form.elements.error.required" />;
    }

    return errors;
};

/**
 * component that adds/updates new user roles
 */
class UserRoleInfoView extends Component<AllProps> {

    constructor(props: AllProps) {
        super(props);

        const {userRole, initialize} = this.props;
        if (userRole) {
            initialize(userRole);
        }
    }

    /**
     * renders output
     */
    public render(): JSX.Element {
        const {handleSubmit} = this.props;

        return (
                <form
                    onSubmit={handleSubmit}
                >
                    <Grid
                        container={true}
                    >
                        <Grid
                            item={true}
                            xs={12}
                        >
                            <FormElement
                                name="role"
                            >
                                <TextField
                                        fullWidth={true}
                                        required={true}
                                        label={
                                                <FormattedMessage
                                                    id="user.role.management.role"
                                                />
                                                }
                                        margin="normal"
                                />
                            </FormElement>
                        </Grid>
                        <Grid
                            item={true}
                            xs={12}
                        >
                            <FormElement
                                name="description"
                            >
                                <TextField
                                        fullWidth={true}
                                        required={true}
                                        label={
                                                <FormattedMessage
                                                    id="user.role.management.description"
                                                />
                                                }
                                        margin="normal"
                                />
                            </FormElement>
                        </Grid>
                    </Grid>
                </form>
            );
    }
}

export default reduxForm<IUserRole, IUserRoleInfoProps>({
    form: "user_role_info", validate,
})(UserRoleInfoView);
