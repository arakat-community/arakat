import React, {Component} from "react";

export interface IErrorBoundryProps {
    errorComponent: JSX.Element;
    children: any;
}

interface IErrorBoundryState {
    hasError: boolean;
    error: any;
    info: any;
}

/**
 * Error boundry class which catchs javascript errors and renders given error component
 * Note: This class does not catch errors which occurrs on event handlers, async requests 
 * or functional stateless components
 */
class ErrorBoundary extends Component<IErrorBoundryProps,IErrorBoundryState> {
    /**
     * constructor
     * @param props React props
     */
    constructor(props: any) {
        super(props);

        this.state = {
            hasError: false,
            error: null,
            info: null
        };
    }

    /**
     * Function that catchs errors
     * @param error Error information
     * @param info Information about error compnent
     */
    componentDidCatch(error: any,info: any): void {
        this.setState({
            hasError: true,
            error,
            info
        });
    }

    /**
     * Renders output
     */
    render(): JSX.Element {
        if(this.state.hasError) {
            return this.props.errorComponent;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;