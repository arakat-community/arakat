import { common } from "@material-ui/core/colors";
import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IResultView } from "../../common/models/resultView/result";
import { status } from "../../common/models/resultView/type";
import IResultTableProps from "../../components/result-table/index";
import ResultTable from "../../components/result-table/index";
import { IApplicationState } from "../../store";
import { dataReceived, dataRequestAttempt } from "../../store/resultView/actions";

interface IDispatchProps {
    fetchData: () => void;
}

interface IResultTableProps {
    resultTableData: IResultView[];
    // snackBarMessages: ISnackbarMessage[];
}

type AllProps = IResultTableProps & IDispatchProps;

/**
 * result table's container. this container is binded to redux store.
 */

/*
        const resultTableData: IResultTableProps = {
            resultTableData: {
                connectionType : [{a: "b"}],
                log: "",
                name: "",
                status: status.success,
                time: new Date(),
*/

class ResultTableContainer extends React.PureComponent<AllProps> {
    // componentDidMount

    public componentDidMount() {
        this.props.fetchData();
      }

    /**
     * render method for result table container
     */
    public render() {

        return (
            <ResultTable
                results={this.props.resultTableData}
            />
        );
    }
}

const mapDispatchToProps: (dispatch: Dispatch) => IDispatchProps = (dispatch: Dispatch): IDispatchProps => {
    return {
        fetchData: () => {
            // request fonksiyonu çağırılacak ?
            dispatch(dataRequestAttempt());
        },
    };
};

const mapStateToProps: (state: IApplicationState) => IResultTableProps =
    (state: IApplicationState): IResultTableProps => ({ resultTableData: state.resultTable.reportResult });

export default connect<IResultTableProps, IDispatchProps>(mapStateToProps, mapDispatchToProps)(ResultTableContainer);
