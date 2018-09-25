import React from "react";
import AppbarShortcutComponent, { IAppbarShortcutProps } from "../../components/appbar-shortcut";

const AppbarShortcutContainer: (props: IAppbarShortcutProps) => JSX.Element =
(props: IAppbarShortcutProps) => ( <AppbarShortcutComponent {...props}/>);

export default AppbarShortcutContainer;
