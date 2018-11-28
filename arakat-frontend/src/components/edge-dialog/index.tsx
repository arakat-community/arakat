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
    typeSelectComponent: {
        margin: '5px'
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
    setIsDialogOpenCallBack: (isEdgeDialogOpen) => void;
    
}
interface IEdgeDialogState {
    type: string;
    order: number;
    portion: number;
}


type AllTypes = IEdgeDialogProps & WithStyles<'dialogContent' | 'typeSelect' | 'typeSelectDiv' | 'additional' |
                                              'additionalDiv' | 'typeSelectComponent'>;

/**
 * DrawerComponent
 */
// class EdgeDialogComponent extends Component<AllTypes, IEdgeDialogState> {
class EdgeDialogComponent extends React.PureComponent<AllTypes, IEdgeDialogState> {

    constructor(props: AllTypes) {
        super(props);
        this.state = {
            type: '',
            order: -1,
            portion: -1
        }
    }

    componentDidMount = () => {
        if( this.props.isDialogOpen ) {
            this.setState({
                type: this.props.commonEdgeTypes[0].type
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
        let additionalParameters = [];
        if( this.props.commonEdgeTypes.length > 0 ) {
            this.props.commonEdgeTypes.map((edgeObject) => {
                if( edgeObject.type === this.state.type && 
                    edgeObject.additional_parameters ) {                        
                    additionalParameters = edgeObject.additional_parameters.map((additional_parameter) => 
                    {
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
        return additionalParameters;
        
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
                <div>
                    <span
                        className={ classes.typeSelectComponent }
                    >
                        Bağlantı Tipi:
                    </span>
                    <Select
                        className={ classes.typeSelect }
                        value={this.state.type}
                        autoWidth={true}
                        onChange={this.setTypeValue()}
                    >
                        {menuItems}
                    </Select>
                </div>
                
            )
        }        
    }
    public handleClose = () => {
        this.props.setIsDialogOpenCallBack(false);
        console.log('closed.');
    }

    public handleOK = () => {
        let edgeObject = {
            type: this.state.type,
            order: this.state.order !== -1 ? this.state.order : undefined,
            portion: this.state.portion !== -1 ? this.state.portion : undefined,
        }
        this.props.addEdgeToGraphEdges(edgeObject, this.props.sourceID, this.props.targetID);
        this.props.setIsDialogOpenCallBack(false);
    }
    /**
     * render output of cyto
     */
    public render(): JSX.Element {
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
