import { Drawer, Hidden, Theme, WithStyles, withStyles } from "@material-ui/core";
import React, { Component, PureComponent } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IUser } from "../../common/models/authentication/user";
import { ISidebarActiveItem } from "../../common/models/sidebar/active-item";
import { Anchor } from "../../common/models/sidebar/anchor";
import { SidebarState } from "../../common/models/sidebar/state";
import { Variant } from "../../common/models/sidebar/variant";
import { ITheme } from "../../common/models/theme";
import CytoGraph from "../../components/cyto/cyto";
import { DrawerState } from "../../components/drawer";
import VerticalDivider from "../../components/vertical-divider";
import AppBar from "../../containers/appbar";
import AppbarShortcutContainer from "../../containers/appbar-shortcut";
import Content from "../../containers/content";
import DrawerContainer from "../../containers/drawer";
import LanguageChanger from "../../containers/language-changer";
import Layout from "../../containers/layout";
import LinearProgress from "../../containers/linear-progress";
import ProfileMenu from "../../containers/profile-menu";
import Snackbar from "../../containers/snackbar";
import { ILocalizationLanguage } from "../../localization/languages";
import { routes as appbarShortcutRoutes } from "../../routes/appbar-shortcut";
import { routes as cytoRoutes } from "../../routes/cyto-content";
import { routes as dashboardRoutes } from "../../routes/dashboard";
import { IApplicationState } from "../../store";
import { changeTheme } from "../../store/app/actions";
import { IApplicationConfigState } from "../../store/app/types";
import { logoutUser } from "../../store/authentication/actions";
import CytoView from "../test/cyto-view";

const style: any = (theme: Theme) => ({
    "@global": {
        a: {
            textDecoration: "none",
        },
    },
});

interface IMainViewState {
    activeMenuItem: ISidebarActiveItem;
    sidebarState: SidebarState;
    sidebarPinned: boolean;
    locale: ILocalizationLanguage;
    shortCutDrawerState: DrawerState;
}

interface IMainViewProps {
    appConfig: IApplicationConfigState;
    locale: ILocalizationLanguage;
    user: IUser;
}

interface IDispatchProps {
    handleLogout: () => void;
    handleThemeChange: (theme: ITheme) => void;
}

type AllProps = IDispatchProps & IMainViewProps & WithStyles;

/**
 * main view of application that contains layout and its related items
 */
class MainView extends Component<AllProps, IMainViewState> {
    constructor(props: AllProps) {
        super(props);

        const {locale} = props;

        this.state = {
            activeMenuItem: {},
            locale,
            sidebarPinned: false,
            sidebarState: SidebarState.closed,
            shortCutDrawerState: DrawerState.closed,
        };
    }

    public componentWillReceiveProps(nextProps: IMainViewProps): void {
        const {locale} = this.state;
        if (nextProps.locale.code !== locale.code) {
            this.setState({
                locale: nextProps.locale,
            });
        }
    }

    /**
     * handles event for sidebar's mouseenter event
     * closes sidebar if it's not pinned
     */
    public handleMouseEnterSidebar = () => {
        const {sidebarState, sidebarPinned} = this.state;
        if (sidebarState === SidebarState.closed && !sidebarPinned) {
            this.setState({
                sidebarState: SidebarState.opened,
            });
        }
    }

    /**
     * handles event for sidebar's mouseleave event
     * closes sidebar if it's not pinned
     */
    public handleMouseLeaveSidebar = () => {
        const {sidebarState, sidebarPinned} = this.state;
        if (sidebarState === SidebarState.opened && !sidebarPinned) {
            this.setState({
                sidebarState: SidebarState.closed,
            });
        }
    }

    /**
     * handles sidebar pin event
     * makes sidebar to open and avoid on mouseenter/mouseleave events
     */
    public handleSidebarPin = () => {
        const {sidebarPinned} = this.state;
        this.setState({
            sidebarPinned: !sidebarPinned,
            sidebarState: !sidebarPinned ? SidebarState.opened : SidebarState.closed,
        });
    }

    /**
     * handles menu click event
     * changes active menu item in state
     */
    public handleMenuClicked = (sidebarActiveItem: ISidebarActiveItem) => {
        this.setState({
            activeMenuItem: sidebarActiveItem,
        });
    }

    /**
     * this function is used for demo only to show theme changes
     */
    public handleThemeChange = () => {
        const {handleThemeChange, appConfig} = this.props;
        const theme: ITheme =  {
            type : appConfig.theme.type === "light" ? "dark" : "light",
        };
        handleThemeChange(theme);
    }

    /**
     * renders output
     */
    public render(): JSX.Element {
        const { locale, user, appConfig, handleLogout } = this.props;
        const { sidebarState, sidebarPinned, activeMenuItem, shortCutDrawerState } = this.state;

        return (
            <>
                <Layout>
                    <DrawerContainer
                        id="shortcut-menu"
                        anchor={Anchor.left}
                        state={shortCutDrawerState}
                        onClose={this.handleShortcutMenuCloseClick}
                        blackTheme={true}
                    >
                    {/* <SidebarGroupContainer
                            id="sidebar-shared-repo"
                            groupTitle={
                                <FormattedMessage
                                    id="menu.item.subheader.shared.repository"
                                />
                            }
                            routeGroup={dashboardRoutes[3]}
                        /> */}
                    </DrawerContainer>
                    <AppBar
                        sidebarPinned={sidebarPinned}
                        routes={dashboardRoutes}
                        logoUrl={appConfig.appLogo}
                        onLogoClick={this.handleLogoClick}
                    >
                        <AppbarShortcutContainer
                            routes={appbarShortcutRoutes}
                        />
                        <ProfileMenu
                            id="profile-menu"
                            name={`${user.name}`}
                            onLogoutClick={handleLogout}
                            onChangeThemeClick={this.handleThemeChange}
                        />
                        <Hidden
                            xsDown={true}
                        >
                            <VerticalDivider />
                            <LanguageChanger />
                        </Hidden>
                        <LinearProgress />
                    </AppBar>
                    <Content
                        routes={...cytoRoutes}
                    />
                </Layout>
                <Snackbar />
            </>
        );
    }

    private handleLogoClick = () => {
        this.setState({
            shortCutDrawerState: DrawerState.opened,
        });
    }

    private handleShortcutMenuCloseClick = () => {
        this.setState({
            shortCutDrawerState: DrawerState.closed,
        });
    }
}

const mapStateToProps: (state: IApplicationState) => IMainViewProps = (state: IApplicationState):
IMainViewProps => ({appConfig: state.appConfig, locale: state.localization.locale, user: state.authentication.user});

const mapDispatchToProps: (dispatch: Dispatch) => IDispatchProps = (dispatch: Dispatch): IDispatchProps => {
    return {
        handleLogout: () => {
            dispatch(logoutUser());
        },
        handleThemeChange: (theme: ITheme) => {
            dispatch(changeTheme(theme));
        },
    };
};

export default connect<IMainViewProps, IDispatchProps>(mapStateToProps, mapDispatchToProps)(withStyles(style, {withTheme: true})(MainView));
