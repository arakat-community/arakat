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
    TextField
} from "@material-ui/core";

const style: any = (theme: Theme) => ({
    dialogContent: {
        backgroundColor: theme.palette.background.default,
        // width: theme.spacing.unit * 35,
        width: theme.spacing.unit * 75,        
    },
    textFieldDiv: {
        //
    },
    textField: {
        //
    }
    
});

export interface IGraphPropertiesDialogProps {
    setGraphProperties: (graphProperties: any) => void;
    setIsGraphPropertiesDialogOpen: (isOpen: boolean) => void;
    isOpen: boolean;
}
interface IGraphPropertiesDialogState {
    appID: string;
    scheduleInterval: string;
    defaultArgs: any;
}


type AllTypes = IGraphPropertiesDialogProps & WithStyles<'dialogContent' | 'textFieldDiv' | 'textField'>;

/**
 * DrawerComponent
 */
class GraphPropertiesDialogComponent extends Component<AllTypes, IGraphPropertiesDialogState> {
    constructor(props: AllTypes) {
        super(props);
        this.state = {
            appID: 'İlk Uygulama',
            scheduleInterval: '@once',
            defaultArgs: {
                owner: 'airflow',
                start_date: '01/01/2018'
            }
        }
    }

    public setAppID = () => (event) => {
        this.setState({
            appID: event.target.value
        })
    }
    public handleClose = () => {
        this.props.setIsGraphPropertiesDialogOpen(false);
    }

    public handleOK = () => {
        this.props.setGraphProperties({
            app_id: this.state.appID,
            schedule_interval: this.state.scheduleInterval,
            default_args: this.state.defaultArgs
        })
        this.handleClose();
    }
    /**
     * render output of cyto
     */
    public render(): JSX.Element {
        const { classes } = this.props;
        let dialogTitle = "Çizge Özellikleri";
        return (
                <div>
                    <Dialog
                        open={this.props.isOpen}
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
                            <div
                                className={classes.textFieldDiv}          
                            >
                                <TextField
                                    id={'appID'}
                                    onChange={this.setAppID()}
                                    required={true}
                                    label={'Uygulama İsmi'}
                                    className={classes.textField}
                                />
                            </div>
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

export default withStyles(style, {withTheme: true})(GraphPropertiesDialogComponent);
