import { 
    Theme, 
    withStyles, 
    WithStyles,
    TextField
} from "@material-ui/core";
import PropTypes from "prop-types";
import React, { Component } from "react";

const style: any = (theme: Theme) => ({    
    arrayComponent: {
        marginTop: '5px'
    },
    textField: {
        fontFamily: 'Lato', // TODO: fontFamily should be in root style of project.
        // margin: '5px'
    },
    rangeStart: {
        width: '100px'
    },
    rangeEnd: {
        width: '100px',
        marginLeft: '50px'
    }
});

export interface ITemplateSubComponentProps {
    parentKey: string;
    type: string;
    subIndex: number;
    updateValueCallback: (subIndex: number, value: string, rangeType?: string) => void;
}

type AllProps = ITemplateSubComponentProps & WithStyles< 'arrayComponent' | 'textField' | 'rangeStart' | 'rangeEnd' >;

/**
 * NodeTreeComponent class
 */
class TemplateSubComponent extends Component<AllProps> {

    constructor(props: AllProps) {
        super(props);
    }

    public getComponentForArray = () => {
        const { classes } = this.props;
        return (
            <TextField
                id={`${this.props.parentKey}-${this.props.subIndex}`}
                onChange={this.callUpdateCallBack(this.props.subIndex)}
                className={classes.textField}
                label={this.props.subIndex}
            />
        );
    }
    public callUpdateCallBack = (subIndex, range?) => (event) => {
        this.props.updateValueCallback(subIndex, event.target.value, range);
    }
    public getComponentForRange = () => {
        const { classes } = this.props;
        return (
            <div>
                <TextField
                    id={`${this.props.parentKey}-${this.props.subIndex}`}
                    onChange={this.callUpdateCallBack(this.props.subIndex, 'start')}
                    className={classes.rangeStart}
                    label="Başlangıç"
                />
                <TextField
                    id={`${this.props.parentKey}-${this.props.subIndex}`}
                    onChange={this.callUpdateCallBack(this.props.subIndex, 'end')}
                    className={classes.rangeEnd}
                    label="Bitiş"
                />
            </div>
        );
    }
    /**
     * render
     */
    public render(): JSX.Element {
        const { classes } = this.props;
        if( this.props.type === 'array' ) {
            return (
                <div
                    className={ classes.arrayComponent }          
                >
                    { this.getComponentForArray() }
                </div>
            )
        } else {
            return (
                <div
                    className={ classes.arrayComponent }          
                >
                    { this.getComponentForRange() }
                </div>
            )
        }
    }
}

export default withStyles(style, {withTheme: true})(TemplateSubComponent);
