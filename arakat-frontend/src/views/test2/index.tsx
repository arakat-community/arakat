import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

// const Test2View: React.SFC = () => (
//     <Typography variant="title"><FormattedMessage id="example.route.works" /></Typography>
// );

export interface ITestState {
    name: string;
}

/**
 * class
 */
class Test2View extends Component<{}, ITestState> {
    constructor(props) {
        super(props);

        this.state = {
            name : "Hello",
        };
    }

    public handleClick = () => {
        this.setState({
            name : "Hello World",
        });

    }

    /**
     * render method
     */
    public render() {
        return(
            <>
                <h1>{this.state.name}</h1>
                <button onClick = {this.handleClick}>Değiştir</button>
            </>
        );
    }
}
export default Test2View;
