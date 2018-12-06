import { Button, Menu, MenuItem, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { IMenuItem } from "../../common/models/menu/item";

const style: any = (theme: Theme) => ({
    root: {
        fontSize: "1.25rem",
    },
});

export interface IMenuProps {
    id: string;
    items: IMenuItem[];
    selectedItem: IMenuItem;
    onItemSelected: (selectedItem: IMenuItem) => void;
}

interface IMenuState {
    anchorEl: any;
    selectedItem: IMenuItem;
}

type Props = IMenuProps & WithStyles<"root">;

/**
 * menu component
 */
class MenuComponent extends Component<Props, IMenuState> {
    constructor(props: Props) {
        super(props);

        const {selectedItem} = props;

        this.state = {
            anchorEl: null,
            selectedItem,
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
        const {items} = this.props;
        const {selectedItem} = this.state;

        const item: IMenuItem = items.find((f) => f.id === event.currentTarget.id);
        this.setState({ anchorEl: null, selectedItem: item ? item : selectedItem });
      }

      /**
       * handles menu item selection event
       */
    public handleItemSelected = (event: any) => {
        const {items, onItemSelected} = this.props;
        const {selectedItem} = this.state;

        const item: IMenuItem = items.find((f) => f.id === event.currentTarget.id);
        this.setState({ anchorEl: null, selectedItem: item ? item : selectedItem });
        onItemSelected(item);
      }

    /**
     * renders output
     */
    public render(): JSX.Element {
        const {anchorEl, selectedItem} = this.state;
        const {id, items, classes} = this.props;

        return (
            <>
                <Button
                  className={classes.root}
                  aria-owns={anchorEl ? id : null}
                  aria-haspopup="true"
                  onClick={this.handleOpenMenu}
                >
                  {selectedItem && selectedItem.text}
                </Button>
                <Menu
                  id={id}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                {items.map((item) => <MenuItem key={item.id} id={item.id} onClick={this.handleItemSelected}>
                    <Typography variant="body1">{item.text}</Typography></MenuItem>)}
                </Menu>
            </>
        );
    }
}

export default withStyles(style)(MenuComponent);
