import React from "react";
import { connect } from "react-redux";
import { LoadingProgressManagement } from "../../common/models/loading-progress/management";
import LinearProgressComponent from "../../components/linear-progress";
import { IApplicationState } from "../../store";

interface ILinearProgressProps {
    loading: boolean;
}

type AllProps= ILinearProgressProps;

const LinearProgress: React.SFC<ILinearProgressProps> = (props: AllProps) => <LinearProgressComponent loading={props.loading}/>;

const mapStateToProps: (state: IApplicationState) => ILinearProgressProps = (state: IApplicationState):
ILinearProgressProps => ({loading: state.request &&
(state.request.management === undefined || state.request.management === null || state.request.management === LoadingProgressManagement.auto)
    && state.request.loading});

export default connect<ILinearProgressProps>(mapStateToProps)(LinearProgress);
