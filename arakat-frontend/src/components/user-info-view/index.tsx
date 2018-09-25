import { Grid, MenuItem, Select, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { InjectedFormProps, reduxForm } from "redux-form";
import isEmail from "validator/lib/isEmail";
import { IUser } from "../../common/models/authentication/user";
import { IUserRole } from "../../common/models/authentication/user-role";
import { IUserInfoViewForm } from "../../common/models/user-info-view/user-form";
import LocalizationLanguages from "../../localization/languages";
import AutoCompleteComponent from "../autocomplete";
import FormElement from "../redux/form-element";

interface IUserInfoProps {
    user?: IUserInfoViewForm;
    userRoles: IUserRole[];
}

type AllProps = IUserInfoProps & InjectedFormProps<IUser, IUserInfoProps>;

/**
 * validates form values and gives apporiate error message
 * @param values form values
 */
const validate: any = (values: IUserInfoViewForm) => {
    const errors: any = {};
    if (!values.username) {
        errors.username = <FormattedMessage id="form.elements.error.required" />;
    }
    if (!values.password) {
        errors.password = <FormattedMessage id="form.elements.error.required" />;
    }
    if (!values.repassword) {
        errors.repassword = <FormattedMessage id="form.elements.error.required" />;
    }
    if (!values.locale) {
        errors.locale = <FormattedMessage id="form.elements.error.required" />;
    }
    if (values.password && values.password !== values.repassword) {
        errors.password = <FormattedMessage id="form.elements.error.passwords.not.match" />;
        errors.repassword = <FormattedMessage id="form.elements.error.passwords.not.match" />;
    }
    if (values.email && !isEmail(values.email)) {
        errors.email = <FormattedMessage id="form.elements.error.email.format" />;
    }

    if (values.citizenshipNumber && values.citizenshipNumber.toString().length !== 11) {
        errors.citizenshipNumber = <FormattedMessage id="form.elements.error.citizenshipNumber.format" />;
    }

    return errors;
};

/**
 * component that adds/updates new users
 */
class UserInfoView extends Component<AllProps> {

    constructor(props: AllProps) {
        super(props);

        const {user, initialize} = this.props;
        if (user) {
            user.repassword =  user.password;
            initialize(user);
        }
    }

    /**
     * renders output
     */
    public render(): JSX.Element {
        const {handleSubmit, userRoles} = this.props;

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
                                name="name"
                            >
                                <TextField
                                        fullWidth={true}
                                        label={
                                                <FormattedMessage
                                                    id="user.management.name"
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
                                name="surname"
                            >
                                <TextField
                                        fullWidth={true}
                                        label={
                                                <FormattedMessage
                                                    id="user.management.surname"
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
                                name="username"
                            >
                                <TextField
                                        fullWidth={true}
                                        label={
                                                <FormattedMessage
                                                    id="user.management.username"
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
                                                    id="user.management.password"
                                                />
                                                }
                                        margin="normal"
                                        required={true}
                                        type="password"
                                />
                            </FormElement>
                        </Grid>
                        <Grid
                            item={true}
                            xs={12}
                        >
                            <FormElement
                                name="repassword"
                            >
                                <TextField
                                        fullWidth={true}
                                        label={
                                                <FormattedMessage
                                                    id="user.management.repassword"
                                                />
                                                }
                                        margin="normal"
                                        required={true}
                                        type="password"
                                />
                            </FormElement>
                        </Grid>
                        <Grid
                            item={true}
                            xs={12}
                        >
                            <FormElement
                                name="email"
                            >
                                <TextField
                                        fullWidth={true}
                                        label={
                                                <FormattedMessage
                                                    id="user.management.email"
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
                                name="citizenshipNumber"
                            >
                                <TextField
                                        fullWidth={true}
                                        label={
                                                <FormattedMessage
                                                    id="user.management.citizenshipNumber"
                                                />
                                                }
                                        margin="normal"
                                        inputProps={
                                            {
                                                maxLength: 11,
                                            }
                                        }
                                />
                            </FormElement>
                        </Grid>
                        <Grid
                            item={true}
                            xs={12}
                        >
                                <FormElement
                                    name="locale"
                                    placeholder={<FormattedMessage id="form.elements.placeholder.select"/>}
                                    required={true}
                                >
                                    <Select
                                        fullWidth={true}
                                    >
                                        {
                                            LocalizationLanguages.AllLanguages.map((language) =>
                                                <MenuItem
                                                    key={language.code}
                                                    value={language.code}
                                                >
                                                    {language.description}
                                                </MenuItem>,
                                            )
                                        }
                                    </Select>
                                </FormElement>
                        </Grid>
                        <Grid
                            item={true}
                            xs={12}
                        >
                            <FormElement
                                name="userRoles"
                            >
                                <AutoCompleteComponent
                                    id="userRoles"
                                    single={false}
                                    fullWidth={true}
                                    primitiveValue={false}
                                    suggestions={
                                       userRoles
                                    }
                                    labelProp="description"
                                />
                            </FormElement>
                        </Grid>
                    </Grid>
                </form>
            );
    }
}

export default reduxForm<IUser, IUserInfoProps>({
    form: "user_info", validate,
})(UserInfoView);
