import React from "react";
import ProfileMenuComponent, { IProfileMenuProps } from "../../components/profile";
import { IApplicationState } from "../../store";
import { setIsGraphPropertiesDialogOpen }  from '../../store/cyto/actions';
import { connect } from "react-redux";
import { Dispatch } from "redux";


interface IDispatchProps {
    setIsGraphPropertiesDialogOpen: (isOpen: boolean) => void;
}


const mapDispatchToProps: (dispatch: Dispatch) =>  IDispatchProps = (dispatch: Dispatch): IDispatchProps => {
    return {
        setIsGraphPropertiesDialogOpen: (isOpen: boolean) => {
            dispatch(setIsGraphPropertiesDialogOpen(isOpen));
        }
    };
};


type AllProps = IDispatchProps & IProfileMenuProps;

const ProfileMenu: (props: AllProps) => JSX.Element = (props: AllProps) => ( <ProfileMenuComponent {...props}/>);

export default connect<undefined, IDispatchProps>(undefined, mapDispatchToProps)(ProfileMenu);
