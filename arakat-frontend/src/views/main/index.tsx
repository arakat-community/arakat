import { Hidden, Theme, WithStyles, withStyles } from "@material-ui/core";
import React, { Component, PureComponent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ITheme } from "../../common/models/theme";
import drawer from "../../components/drawer";
import VerticalDivider from "../../components/vertical-divider";
import AppBar from "../../containers/appbar";
import AppbarShortcutContainer from "../../containers/appbar-shortcut";
import Content from "../../containers/content";
import DrawerContainer from "../../containers/drawer";
import LanguageChanger from "../../containers/language-changer";
import Layout from "../../containers/layout";
import LinearProgress from "../../containers/linear-progress";
import NodeTreeContainer from "../../containers/node-tree";
import ProfileMenu from "../../containers/profile-menu";
import Snackbar from "../../containers/snackbar";
import { ILocalizationLanguage } from "../../localization/languages";
import { routes as appbarShortcutRoutes } from "../../routes/appbar-shortcut";
import { routes as cytoRoutes } from "../../routes/cyto-content";
import { routes as dashboardRoutes } from "../../routes/dashboard";
import { IApplicationState } from "../../store";
import { changeTheme } from "../../store/app/actions";
import { IApplicationConfigState } from "../../store/app/types";
import { changeDrawerIsOpen, fetchNodeTree } from "../../store/drawer/actions";
import { IDrawerState } from "../../store/drawer/types";

const style: any = (theme: Theme) => ({
    "@global": {
        a: {
            textDecoration: "none",
        },
    },
});

interface IMainViewState {
    locale: ILocalizationLanguage;
}

interface IMainViewProps {
    appConfig: IApplicationConfigState;
    drawerState: IDrawerState;
    locale: ILocalizationLanguage;
}

interface IDispatchProps {
    handleThemeChange: (theme: ITheme) => void;
    changeDrawerIsOpen: (isOpen: boolean) => void;
    fetchNodeTree: () => void; // from props
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
            locale,
        };
    }

    public componentWillMount() {
        this.props.fetchNodeTree();
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
        const { locale, appConfig } = this.props;
        return (
            <>
                <Layout>
                    <DrawerContainer
                        id="drawer"
                        onClose={this.handleDrawerCloseClick}
                        blackTheme={true}
                    >
                        <NodeTreeContainer/>
                    </DrawerContainer>
                    <AppBar
                        routes={dashboardRoutes}
                        logoUrl={appConfig.appLogo}
                        onLogoClick={this.handleDrawerCloseClick}
                    >
                        <AppbarShortcutContainer
                            routes={appbarShortcutRoutes}
                        />
                        <ProfileMenu
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

    private handleDrawerCloseClick = () => {
        if ( this.props.drawerState.isOpen === true) {
            this.props.changeDrawerIsOpen(false);
        } else {
            this.props.changeDrawerIsOpen(true);
        }
    }
}

const mapStateToProps: (state: IApplicationState) => IMainViewProps = (state: IApplicationState):
IMainViewProps => ({appConfig: state.appConfig, drawerState: state.drawer, locale: state.localization.locale});

const mapDispatchToProps: (dispatch: Dispatch) => IDispatchProps = (dispatch: Dispatch): IDispatchProps => {
    return {
        handleThemeChange: (theme: ITheme) => {
            dispatch(changeTheme(theme));
        },
        changeDrawerIsOpen: (isOpen: boolean) => {
            dispatch(changeDrawerIsOpen(isOpen));
        },
        fetchNodeTree: () => {
            dispatch(fetchNodeTree());
        },
    };
};

export default connect<IMainViewProps, IDispatchProps>(mapStateToProps, mapDispatchToProps)(withStyles(style, {withTheme: true})(MainView));
