import { Button, WithStyles, withStyles } from "@material-ui/core";
import React, { Component } from "react";

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
    setIsGraphPropertiesDialogOpen: (isOpen: boolean) => void;
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

    public openDagPropertiesDialog = () => {
        this.props.setIsGraphPropertiesDialogOpen(true);
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

        return (
            <>
                <Button
                  aria-owns={anchorEl ? 'id' : null}
                  aria-haspopup="true"
                  onClick={this.openDagPropertiesDialog}
                  children="çalıştır"
                />                
                
            </>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ProfileMenuComponent);
