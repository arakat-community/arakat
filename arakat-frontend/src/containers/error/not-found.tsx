import React from "react";
import { connect } from "react-redux";
import {goBack} from "react-router-redux";
import { Dispatch } from "redux";
import NotFoundComponent, { INotFoundProps } from "../../components/error/not-found";

interface IDispatchProps {
    goBack: () => void;
}

type AllProps = IDispatchProps;

const notFound: React.SFC<AllProps> = (props: AllProps) => (
    <NotFoundComponent onGoBack={props.goBack} />
);

const mapDispatchToProps: (dispatch: Dispatch) => IDispatchProps = (dispatch: Dispatch): IDispatchProps => {
    return {
        goBack: () => {
            dispatch(goBack());
        },
    };
};

export default connect<undefined, IDispatchProps>(undefined, mapDispatchToProps)(notFound);
