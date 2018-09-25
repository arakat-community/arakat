import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import { Theme, WithStyles, withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell/TableCell";
import React from "react";
import { IDataCellProps } from "./cell-props";

const style: any = (theme: Theme) => ({
    cell: {
        textAlign: "center",
    },
});

type AllProps = IDataCellProps & WithStyles<"cell">;

const CheckboxCell: React.SFC<AllProps> = ({classes, ...props}: AllProps) => (
    <TableCell
        className={classes.cell}
    >
        <Checkbox
            disabled={true}
            checked={props.value}
        />
    </TableCell>
);

export default withStyles(style, {withTheme: true})(CheckboxCell);
