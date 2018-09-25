import { Hidden } from "@material-ui/core";
import React, { Component } from "react";
import { defineMessages, FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IUser } from "../../common/models/authentication/user";
import { IUserRole } from "../../common/models/authentication/user-role";
import { DialogState } from "../../common/models/dialog/state";
import { FormState } from "../../common/models/form-state";
import { IGridColumn } from "../../common/models/grid-column";
import { GridColumnType } from "../../common/models/grid-column/type";
import { MessageBoxState, MessageBoxType } from "../../common/models/message-box/type";
import { getFormValues, IFormData, isFormLoading, isFormValid } from "../../common/utils/form";
import { InitialValue } from "../../common/utils/initial-value";
import DataGridContainer from "../../containers/datagrid";
import DialogContainer from "../../containers/dialog";
import ConfirmDialog from "../../containers/message-box";
import PageBodyContainer from "../../containers/page-body";
import PageHeaderContainer from "../../containers/page-header";
import PageViewContainer from "../../containers/page-view";
import UserInfoViewContainer from "../../containers/user-info-view";
import { IApplicationState } from "../../store";
import { fetchUserRoles } from "../../store/role-management/actions";
import { fetchUsers, removeUser, saveUser, updateUser } from "../../store/user-management/actions";

let columns: IGridColumn[] = [];

/**
 * define column message by injecting localization hoc to container
 */
const gridColumnTranslatedMessages: any = defineMessages({
    citizenshipNumber: {
        id: "column.citizenshipNumber",
    },
    email: {
        id: "column.email",
    },
    enabled: {
        id: "column.enabled",
    },
    name: {
        id: "column.name",
    },
    surname: {
        id: "column.surname",
    },
    statusActive: {
        id: "column.status.active",
    },
    statusDeactive: {
        id: "column.status.deactive",
    },
    selectDefault: {
        id: "column.select.default",
    },
});

interface IDispatchProps {
    getUserRoles: () => void;
    list: (filter?: IUser) => void;
    remove: (userId: number) => void;
    save: (user: IUser) => void;
    update: (update: IUser) => void;
}

interface IUserManagementViewProps {
    data: object[];
    userRoles: IUserRole[];
    formData?: IUser;
    formLoading?: boolean;
    formState?: FormState;
}

interface IUserManagementViewState {
    userManagementDialogState: DialogState;
    deleteConfirmState?: MessageBoxState;
    selectedUser?: IUser;
}

type AllProps = IUserManagementViewProps & IDispatchProps & InjectedIntlProps;

/**
 * user management view component
 */
class UserManagementView extends Component<AllProps, IUserManagementViewState> {
    constructor(props: AllProps) {
        super(props);

        this.state = {
            userManagementDialogState: DialogState.close,
        };

        const {intl} = props;

        columns = [
            {
                name: "name",
                title: intl.formatMessage(gridColumnTranslatedMessages.name),
                type: GridColumnType.String,
            },
            {
                name: "surname",
                title: intl.formatMessage(gridColumnTranslatedMessages.surname),
                type: GridColumnType.String,
            },
            {
                name: "enabled",
                title: intl.formatMessage(gridColumnTranslatedMessages.enabled),
                type: GridColumnType.Boolean,
                booleanTypeDescription: {
                    enabledMessage: intl.formatMessage(gridColumnTranslatedMessages.statusActive),
                    disabledMessage: intl.formatMessage(gridColumnTranslatedMessages.statusDeactive),
                },
                selectFilterGridColumn: {
                    defaultName: intl.formatMessage(gridColumnTranslatedMessages.selectDefault),
                },
            },
            {
                name: "email",
                title: intl.formatMessage(gridColumnTranslatedMessages.email),
                type: GridColumnType.String,
            },
            {
                name: "citizenshipNumber",
                title: intl.formatMessage(gridColumnTranslatedMessages.citizenshipNumber),
                type: GridColumnType.String,
            },
        ];
    }

    public componentDidMount(): void {
        const {list, getUserRoles} = this.props;
        if (list) {
            list();
        }

        if (getUserRoles) {
            getUserRoles();
        }
    }

    /**
     * renders output
     */
    public render(): JSX.Element {
        const {data, formState, formLoading, userRoles} = this.props;
        const {userManagementDialogState, selectedUser, deleteConfirmState} = this.state;

        return (
            <>
                <PageViewContainer>
                    <Hidden
                        xsDown={true}
                    >
                        <PageHeaderContainer
                            showSearchBox={true}
                            showAddNewRecord={true}
                            onNewButtonClick={this.handleUserManagementViewDialog}
                        />
                    </Hidden>
                    <PageBodyContainer>
                        <DataGridContainer
                            columns={columns}
                            data={data}
                            enableColumnChooser={false}
                            enableGrouping={true}
                            enableSelection={true}
                            enableSelectionAll={true}
                            enableSorting={false}
                            enableDeleteAction={true}
                            enableEditAction={true}
                            onEditAction={this.handleUserManagementRowEdit}
                            onDeleteAction={this.handleUserManagementRowDelete}
                        />
                    </PageBodyContainer>
                </PageViewContainer>
                <DialogContainer
                        id="user-management-dialog"
                        state={userManagementDialogState}
                        title={<FormattedMessage id="user.management.new.dialog.title"/>}
                        content={
                                    <UserInfoViewContainer
                                        user={selectedUser}
                                        userRoles={userRoles}
                                    />
                                }
                        onSave={this.handleUserSave}
                        onClose={this.handleDialogClose}
                        formState={formState}
                        loading={formLoading}
                />
                <ConfirmDialog
                    onAgree={this.handleDeleteAgree}
                    onClose={this.handleDeleteClose}
                    id="user_management_delete_confirm"
                    state={deleteConfirmState}
                    text={<FormattedMessage id="user.management.delete.confirm.text"/>}
                    title={<FormattedMessage id="user.management.delete.confirm.title"/>}
                    type={MessageBoxType.confirmation}
                />
            </>
        );
    }

    public componentWillReceiveProps(nextProps: AllProps): void {

        /**
         * this part controls dialog to open until save operation finish
         */
        const {formLoading} = this.props;
        if (!nextProps.formLoading && formLoading) {
            this.handleDialogClose();
        }
    }

    private handleUserSave = () => {
        const {formData, save, update} = this.props;
        if (formData.id && formData.id > 0) {
            update(formData);
        } else {
            save(formData);
        }
    }

    private handleDialogClose = () => {
        this.setState({
            selectedUser: null,
            userManagementDialogState: DialogState.close,
        });
    }

    private handleUserManagementViewDialog = () => {
        this.setState({
            userManagementDialogState: DialogState.open,
        });
    }

    private handleUserManagementRowEdit = (row) => {
        this.setState({
            selectedUser: row,
            userManagementDialogState: DialogState.open,
        });
    }

    private handleUserManagementRowDelete = (row) => {
        this.setState({
            deleteConfirmState: MessageBoxState.open,
            selectedUser: row,
        });
    }

    private handleDeleteAgree = () => {
        const userId: number = this.state.selectedUser.id;

        this.setState({
            deleteConfirmState: MessageBoxState.close,
            selectedUser: null,
        },            () => {
            const {remove} = this.props;
            remove(userId);
        });
    }

    private handleDeleteClose = () => {
        this.setState({
            deleteConfirmState: MessageBoxState.close,
            selectedUser: null,
        });
    }
}

const mapDispatchToProps: (dispatch: Dispatch) => IDispatchProps = (dispatch: Dispatch): IDispatchProps => {
    return {
        list: (filter?: IUser) => {
         dispatch(fetchUsers(filter));
       },
        remove: (userId: number) => {
         dispatch(removeUser(userId));
       },
        save: (user: IUser) => {
           dispatch(saveUser(user));
       },
        update: (user: IUser) => {
           dispatch(updateUser(user));
       },
        getUserRoles: () => {
           dispatch(fetchUserRoles());
       },
    };
  };

const mapStateToProps: (state: IApplicationState) => IUserManagementViewProps =
(state: IApplicationState): IUserManagementViewProps => {
    const initalFormValues: IFormData<IUser> = {
        data: {
            accountNonExpired: InitialValue.BooleanType,
            accountNonLocked: InitialValue.BooleanType,
            credentialsNonExpired: InitialValue.BooleanType,
            citizenshipNumber: InitialValue.StringType,
            email:  InitialValue.StringType,
            enabled:  InitialValue.BooleanType,
            ldapUserId:  InitialValue.NumberType,
            locale:  InitialValue.StringType,
            id:  InitialValue.NumberType,
            name:  InitialValue.StringType,
            password:  InitialValue.StringType,
            passwordEncrypted:  InitialValue.BooleanType,
            surname:  InitialValue.StringType,
            username:  InitialValue.StringType,
            userRoles:  InitialValue.ArrayType,
        },
    };

    return {
                data: state.userManagement ? state.userManagement.users : [],
                userRoles: state.userRoleManagement ? state.userRoleManagement.userRoles : [],
                formData: getFormValues<IUser>(state, "user_info", initalFormValues),
                formLoading: isFormLoading(state, "user_info"),
                formState: isFormValid(state, "user_info"),
            };
};

export default connect<IUserManagementViewProps, IDispatchProps>(mapStateToProps, mapDispatchToProps)(injectIntl(UserManagementView));
