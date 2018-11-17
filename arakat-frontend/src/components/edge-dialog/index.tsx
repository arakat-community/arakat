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
    Select,
    MenuItem,
    TextField
} from "@material-ui/core";
const style: any = (theme: Theme) => ({
    dialogContent: {
        backgroundColor: theme.palette.background.default,
        // width: theme.spacing.unit * 35,
        width: theme.spacing.unit * 75,
        
    },
    typeSelect: {
        // --
    },
    typeSelectDiv: {

    },
    additional: {

    },
    additionalDiv: {

    }
});

export interface IEdgeDialogProps {
    isDialogOpen: boolean;
    commonEdgeTypes: any[];
    sourceID: string;
    targetID: string;
    addEdgeToGraphEdges: (edge, sourceID, targetID) => void;
    
}
interface IEdgeDialogState {
    type: string;
    order: number;
    portion: number;
}


type AllTypes = IEdgeDialogProps & WithStyles<'dialogContent' | 'typeSelect' | 'typeSelectDiv' | 'additional' |
                                              'additionalDiv'>;

/**
 * DrawerComponent
 */
class EdgeDialogComponent extends Component<AllTypes, IEdgeDialogState> {
    constructor(props: AllTypes) {
        super(props);
        this.state = {
            type: '',
            order: -1,
            portion: -1
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if( nextProps.isDialogOpen ) {
            this.setState({
                type: nextProps.commonEdgeTypes[0].type
            });

            
        }
    }

    public setAdditionalParameterValue = (additional_parameter) => (event) => {
        this.setState({
            ...this.state,
            [`${additional_parameter}`]: event.target.value
        })
    }
    public getAdditionalParameterComponents = () => {
        const { classes } = this.props;
        this.props.commonEdgeTypes.map((edgeObject) => {
            if( edgeObject.type === this.state.type && 
                edgeObject.additional_parameters ) {
                edgeObject.additional_parameters.map((additional_parameter) => {
                    return (
                        <div
                            className={classes.additionalDiv}          
                        >
                            <TextField
                                id={additional_parameter}
                                onChange={this.setAdditionalParameterValue(additional_parameter)}
                                required={true}
                                label={additional_parameter}
                                placeholder='>= 0'
                                className={classes.additional}
                            />
                        </div>
                    );
                })  
            }
        })
        
    }
    public setTypeValue = () => (event) => {
        this.setState({
            type: event.target.value
        })
    }
    public getTypeSelectComponent = () => {
        const { classes } = this.props;
        if( this.props.commonEdgeTypes.length > 1 ) {
            let menuItems = [];
            this.props.commonEdgeTypes.map((item) => {
                menuItems.push(<MenuItem value={item.type}> { item.type } </MenuItem>)
            });
            return (
                <Select
                    className={ classes.typeSelect }
                    value={this.state.type}
                    autoWidth={true}
                    onChange={this.setTypeValue()}
                >
                    {menuItems}
                </Select>
            )
        }        
    }
    public handleClose = () => {
        console.log('closed.')
    }

    public handleOK = () => {
        let edgeObject = {
            type: this.state.type,
            order: this.state.order !== -1 ? this.state.order : undefined,
            portion: this.state.portion !== -1 ? this.state.portion : undefined,
        }
        this.props.addEdgeToGraphEdges(edgeObject, this.props.sourceID, this.props.targetID);
    }
    /**
     * render output of cyto
     */
    public render(): JSX.Element {
        const { classes } = this.props;
        let dialogTitle = "Bağlantı Parametreleri";
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
                            {this.getTypeSelectComponent()}
                            {this.getAdditionalParameterComponents()}
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

export default withStyles(style, {withTheme: true})(EdgeDialogComponent);
