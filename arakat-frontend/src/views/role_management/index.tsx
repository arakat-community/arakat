import { Hidden } from "@material-ui/core";
import React, { Component } from "react";
import { defineMessages, FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Dispatch } from "redux";
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
import UserRoleInfoViewContainer from "../../containers/user-role-info-view";
import { IApplicationState } from "../../store";
import { fetchUserRoles, removeUserRole, saveUserRole, updateUserRole } from "../../store/role-management/actions";

let columns: IGridColumn[] = [];

/**
 * define column message by injecting localization hoc to container
 */
const gridColumnTranslatedMessages: any = defineMessages({
    description: {
        id: "column.description",
    },
    roleName: {
        id: "column.role.name",
    },
});

interface IDispatchProps {
    list: (filter?: IUserRole) => void;
    remove: (userRoleId: number) => void;
    save: (user: IUserRole) => void;
    update: (update: IUserRole) => void;
}

interface IUserRoleManagementViewProps {
    data: object[];
    formData?: IUserRole;
    formLoading?: boolean;
    formState?: FormState;
}

interface IUserRoleManagementViewState {
    userRoleManagementDialogState: DialogState;
    deleteConfirmState?: MessageBoxState;
    selectedUserRole?: IUserRole;
}

type AllProps = IUserRoleManagementViewProps & IDispatchProps & InjectedIntlProps;

/**
 * user role management view component
 */
class UserRoleManagementView extends Component<AllProps, IUserRoleManagementViewState> {
    constructor(props: AllProps) {
        super(props);

        this.state = {
            userRoleManagementDialogState: DialogState.close,
        };

        const {intl} = props;

        columns = [
            {
                name: "role",
                title: intl.formatMessage(gridColumnTranslatedMessages.roleName),
                type: GridColumnType.String,
            },
            {
                name: "description",
                title: intl.formatMessage(gridColumnTranslatedMessages.description),
                type: GridColumnType.String,
            },
        ];
    }

    public componentDidMount(): void {
        const {list} = this.props;
        if (list) {
            list();
        }
    }

    /**
     * renders output
     */
    public render(): JSX.Element {
        const {data, formState, formLoading} = this.props;
        const {userRoleManagementDialogState, selectedUserRole, deleteConfirmState} = this.state;

        return (
            <>
                <PageViewContainer>
                    <Hidden
                        xsDown={true}
                    >
                        <PageHeaderContainer
                            showSearchBox={true}
                            showAddNewRecord={true}
                            onNewButtonClick={this.handleUserRoleManagementViewDialog}
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
                            onEditAction={this.handleUserRoleManagementRowEdit}
                            onDeleteAction={this.handleUserRoleManagementRowDelete}
                        />
                    </PageBodyContainer>
                </PageViewContainer>
                <DialogContainer
                        id="user-role-management-dialog"
                        state={userRoleManagementDialogState}
                        title={<FormattedMessage id="user.role.management.new.dialog.title"/>}
                        content={
                                    <UserRoleInfoViewContainer
                                        userRole={selectedUserRole}
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
                    id="user_role_management_delete_confirm"
                    state={deleteConfirmState}
                    text={<FormattedMessage id="user.role.management.delete.confirm.text"/>}
                    title={<FormattedMessage id="user.role.management.delete.confirm.title"/>}
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
            selectedUserRole: null,
            userRoleManagementDialogState: DialogState.close,
        });
    }

    private handleUserRoleManagementViewDialog = () => {
        this.setState({
            userRoleManagementDialogState: DialogState.open,
        });
    }

    private handleUserRoleManagementRowEdit = (row) => {
        this.setState({
            selectedUserRole: row,
            userRoleManagementDialogState: DialogState.open,
        });
    }

    private handleUserRoleManagementRowDelete = (row) => {
        this.setState({
            deleteConfirmState: MessageBoxState.open,
            selectedUserRole: row,
        });
    }

    private handleDeleteAgree = () => {
        const userRoleId: number = this.state.selectedUserRole.id;

        this.setState({
            deleteConfirmState: MessageBoxState.close,
            selectedUserRole: null,
        },            () => {
            const {remove} = this.props;
            remove(userRoleId);
        });
    }

    private handleDeleteClose = () => {
        this.setState({
            deleteConfirmState: MessageBoxState.close,
            selectedUserRole: null,
        });
    }
}

const mapDispatchToProps: (dispatch: Dispatch) => IDispatchProps = (dispatch: Dispatch): IDispatchProps => {
    return {
        list: (filter?: IUserRole) => {
         dispatch(fetchUserRoles(filter));
       },
        remove: (userRoleId: number) => {
         dispatch(removeUserRole(userRoleId));
       },
        save: (userRole: IUserRole) => {
           dispatch(saveUserRole(userRole));
       },
        update: (userRole: IUserRole) => {
           dispatch(updateUserRole(userRole));
       },
    };
  };

const mapStateToProps: (state: IApplicationState) => IUserRoleManagementViewProps =
(state: IApplicationState): IUserRoleManagementViewProps => {
    const initialFormValues: IFormData<IUserRole> = {
        data: {
            description: InitialValue.StringType,
            id: InitialValue.NumberType,
            role: InitialValue.StringType,
        },
    };

    return  {
        data: state.userRoleManagement ? state.userRoleManagement.userRoles : [],
        formData: getFormValues<IUserRole>(state, "user_role_info", initialFormValues),
        formLoading: isFormLoading(state, "user_role_info"),
        formState: isFormValid(state, "user_role_info"),
    };
};

export default connect<IUserRoleManagementViewProps, IDispatchProps>(mapStateToProps, mapDispatchToProps)
(injectIntl(UserRoleManagementView));
