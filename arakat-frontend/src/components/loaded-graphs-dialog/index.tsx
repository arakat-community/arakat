import React, { Component } from "react";
import { 
    withStyles, 
    WithStyles, 
    Theme, 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle,
    ListItem,
    List
} from "@material-ui/core";

const style: any = (theme: Theme) => ({
    dialogContent: {
        backgroundColor: theme.palette.background.default,
        // width: theme.spacing.unit * 35,
        width: theme.spacing.unit * 75,
        
    }
});

export interface ILoadedGraphsDialogProps {
    isDialogOpen: boolean;
    loadedGraphs: any[];
    fetchGraphs: () => void;
    fetchGraph: (graphId: string) => void;
    setIsLoadedGraphsDialogOpen: (isOpen: boolean) => void;
}

interface ILoadedGraphsDialogState {
    selectedGraph: any;
}

type AllTypes = ILoadedGraphsDialogProps & WithStyles<'dialogContent'>;

/**
 * DrawerComponent
 */
class LoadedGraphsDialogComponent extends React.PureComponent<AllTypes, ILoadedGraphsDialogState> {
    constructor(props: AllTypes) {
        super(props);
    }

    public componentDidMount = () => {
        if( this.props.isDialogOpen ) {
            this.props.fetchGraphs();
        }
    }
    public handleClose = () => {
        this.props.setIsLoadedGraphsDialogOpen(false);
        console.log('closed.');
    }

    public handleOK = () => {
    }

    public handleGraphSelect = value => () => {
        console.log('value: ');
        console.log(value);

    }
    public getLoadedGraphs = () => {
        const { classes, loadedGraphs } = this.props;
        let listItems = [];
        loadedGraphs.map((item) => {
            listItems.push(
                <ListItem 
                    value={ item.mongoId }
                    onClick={ this.handleGraphSelect( item ) }
                >
                    { item.appId }
                </ListItem>
            )
        });
        return (
            <div
                className={ classes.dialogContent }          
            >
                <List
                >
                    { listItems }
                </List>
            </div>
            
        )
    }
    /**
     * render output of cyto
     */
    public render(): JSX.Element {
        let dialogTitle = "Kayıtlı Çizgeler";
        return (
                <div>
                    <Dialog
                        open={this.props.isDialogOpen}
                        onClose={this.handleClose}
                        style={{width:"100%", maxWidth: "none"}}
                        aria-labelledby="scroll-dialog-title"
                    >
                        <DialogTitle
                            id="scroll-dialog-title"
                        >
                            { dialogTitle }
                        </DialogTitle>

                        <DialogContent>
                            {this.getLoadedGraphs()}
                        </DialogContent>
                        <DialogActions>
                        <Button
                            onClick={this.handleClose}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleOK}
                            color="primary"
                        >
                            OK
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>
        );
    }

}

export default withStyles(style, {withTheme: true})(LoadedGraphsDialogComponent);


