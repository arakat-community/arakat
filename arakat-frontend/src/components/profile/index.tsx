import { 
    Button, 
    WithStyles, 
    withStyles,
 } from "@material-ui/core";
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
    buttonSpan : {
        color: 'black'
    }
});

export interface IProfileMenuProps {
    graph: any;
    loadedGraphs: any[];
    setIsGraphPropertiesDialogOpen: (isOpen: boolean) => void;
    saveGraph: (graph: any) => void;
    setIsAboutToSave: (isAboutToSave: boolean) => void;
    setIsAboutToRun: (isAboutToRun: boolean) => void;
    setIsLoadedGraphsDialogOpen: (isOpen: boolean) => void;
}

interface IProfileMenuState {
    anchorEl: any;
    selectedItem: string;
}

type Props = IProfileMenuProps & WithStyles<"name" | "profile" | "title" | 'buttonSpan'>;

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

    public openGraphPropertiesDialogForRun = () => {
        this.props.setIsAboutToRun(true);
        this.props.setIsAboutToSave(false);
        this.props.setIsGraphPropertiesDialogOpen(true);
    }

      /**
       * closes menu on item selected
       */
    public handleClose = (event: any) => {
        this.setState({ anchorEl: null, selectedItem: event.currentTarget.textContent });
      }

    
    public checkIfGraphIsLoaded = () => {
        if( this.props.graph.dag_properties ) {
            this.props.saveGraph(this.props.graph);
        } else {
            this.props.setIsAboutToSave(true);
            this.props.setIsAboutToRun(false);
            this.props.setIsGraphPropertiesDialogOpen(true);
        }
    }

    public openLoadedGraphsDialog = () => {
        this.props.setIsLoadedGraphsDialogOpen(true);
    }
    /**
     * renders output
     */
    public render(): JSX.Element {
        const {anchorEl} = this.state;
        const { classes } = this.props;
        return (
            <>
                <Button
                  aria-owns={anchorEl ? 'id' : null}
                  aria-haspopup="true"
                  onClick={this.openLoadedGraphsDialog}
                >
                    <span
                        className = { classes.buttonSpan }
                    > 
                        Yükle 
                    </span>
                </Button>
                <Button
                  aria-owns={anchorEl ? 'id' : null}
                  aria-haspopup="true"
                  onClick={this.openGraphPropertiesDialogForRun}
                >
                    <span
                        className = { classes.buttonSpan }
                    > 
                        Çalıştır 
                    </span>
                </Button> 
                <Button
                  aria-owns={anchorEl ? 'id' : null}
                  aria-haspopup="true"
                  onClick={this.checkIfGraphIsLoaded}
                >
                    <span
                        className = { classes.buttonSpan }
                    > 
                        Kaydet 
                    </span>
                </Button>                 
                
            </>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ProfileMenuComponent);
