import React from "react";
import ProfileMenuComponent, { IProfileMenuProps } from "../../components/profile";

const ProfileMenu: (props: IProfileMenuProps) => JSX.Element = (props: IProfileMenuProps) => ( <ProfileMenuComponent {...props}/>);

export default ProfileMenu;
