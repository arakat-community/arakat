import { Avatar, Button, IconButton, Menu, MenuItem, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

const styles: any = () => ({
    name: {
        alignItems: "flex-start",
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        paddingLeft: 8,
    },
    profile: {
        alignItems: "center",
        display: "flex",
    },
    title: {
        fontWeight: 600,
    },
});

export interface IProfileMenuProps {
    id: string;
    onChangeThemeClick: () => void;
}

interface IProfileMenuState {
    anchorEl: any;
    selectedItem: string;
}

type Props = IProfileMenuProps & WithStyles<"name" | "profile" | "title">;

/**
 * menu component
 */
class ProfileMenuComponent extends Component<Props, IProfileMenuState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            anchorEl: null,
            selectedItem: "",
        };
    }

    /**
     * opens menu on click
     */
    public handleOpenMenu = (event: any) => {
        this.setState({ anchorEl: event.currentTarget });
      }

      /**
       * closes menu on item selected
       */
    public handleClose = (event: any) => {
        this.setState({ anchorEl: null, selectedItem: event.currentTarget.textContent });
      }

    /**
     * renders output
     */
    public render(): JSX.Element {
        const {anchorEl} = this.state;
        const {classes, id} = this.props;

        return (
            <>
                <Button
                  aria-owns={anchorEl ? id : null}
                  aria-haspopup="true"
                  onClick={this.handleOpenMenu}
                />
                <Menu
                  anchorOrigin={{
                    horizontal: "right",
                    vertical: "center",
                  }}
                  transformOrigin={{
                    horizontal: "right",
                    vertical: "center",
                  }}
                  id={id}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                    <MenuItem
                        onClick={this.handleChangeTheme}
                    >
                        <Typography
                            variant="body1"
                        >
                            <FormattedMessage
                                id="menu.item.change.theme"
                            />
                        </Typography>
                    </MenuItem>
                </Menu>
            </>
        );
    }

    private handleChangeTheme = (event: any) => {
        this.handleClose(event);
        const {onChangeThemeClick} = this.props;
        if (onChangeThemeClick) {
            onChangeThemeClick();
        }
    }
}

export default withStyles(styles, {withTheme: true})(ProfileMenuComponent);
