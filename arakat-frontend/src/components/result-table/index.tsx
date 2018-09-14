import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { FormattedMessage } from "react-intl";
import ButtonType from "../../common/models/button/type";
import { IResultView } from "../../common/models/resultView/result";
import Button from "../../containers/button";

export interface IResultTableProps {
  results: IResultView[];
}

const style: any = (theme) => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    width: "100%",
  },
  table: {
    minWidth: 700,
  },
});

const id = 0;

/**
 * createData function
 */
/*
function createData(name, status, time, connectionType) {
  id += 1;
  return { id, name, status, time, connectionType};
}

const rows = [
  createData("result1", "processing..", "12/09/2018", "connection type"),
  createData("result2", "ready", "12/09/2018", "connection type"),
  createData("result3", "processing..", "12/09/2018", "connection type"),
  createData("result4", "processing..", "12/09/2018", "connection type"),
  createData("result5", "ready", "12/09/2018", "connection type"),
];*/

type PropWithStyles = IResultTableProps;

const ResultTable: React.SFC<IResultTableProps> = ({
  ...props
}: PropWithStyles) => (
    <Paper className="classname"/*{classes.root}*/>
      <Table className="classname"/*{classes.table}*/>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >Status</TableCell>
            <TableCell >Time</TableCell>
            <TableCell >Connection Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.results && props.results.map((results) => {
            return (
              <TableRow>
                <TableCell component="th" scope="row">{results.name}</TableCell>
                <TableCell >{results.status}</TableCell>
                <TableCell >{results.time}</TableCell>
                <TableCell >{results.connectionType}</TableCell>
                <TableCell ></TableCell>

                <TableCell ><Button label={<FormattedMessage id="dialog.button.show" />} type={ButtonType.normal}>Show</Button></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>

  );

export default withStyles(style)(ResultTable);
