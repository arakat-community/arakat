import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import Table from '@material-ui/core/Table';
import {
    Theme, WithStyles, withStyles,
} from "@material-ui/core";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { InjectedIntlProps, injectIntl } from "react-intl";
import { IField, ITableType } from "../../models/tableComponent/index";

export interface IProps {
    headerKeyList: string[];
    fieldKeyList?: IField[];
    modelList: any[];
    type: ITableType;
    tableBody?: JSX.Element[];
}


const styles: any = (theme: Theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    badge: {
        top: 1,
        right: -15,
        border: `2px solid ${
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
            }`,
    },
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: `0 ${theme.spacing.unit * 2}px`,
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

type PropWithStyles = IProps & WithStyles<"root" | "table" | "button" | "leftIcon" | "iconSmall">
    & InjectedIntlProps;

/**
 * export xy chart
 */
class TableComponent extends Component<PropWithStyles> {
    constructor(props: PropWithStyles) {
        super(props);
    }

    /**
     * div element html
     */
    public render(): JSX.Element {
        const { classes, headerKeyList, fieldKeyList, modelList, type } = this.props;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {
                                headerKeyList.map(headerKey => {
                                    return (
                                        <TableCell>
                                            {
                                                headerKey !== "" &&
                                                <FormattedMessage
                                                    id={headerKey}
                                                />
                                            }

                                        </TableCell>
                                    );
                                })
                            }
                        </TableRow>
                    </TableHead>
                    {
                        <TableBody>
                            {
                                type === ITableType.text &&
                                modelList.map(model => {
                                    return (
                                        <TableRow>
                                            {
                                                fieldKeyList.map(fieldKey => {
                                                    return (
                                                        <TableCell component="th" scope="row">
                                                            {
                                                                model[fieldKey.key]
                                                            }
                                                        </TableCell>
                                                    );
                                                })
                                            }
                                        </TableRow>
                                    );
                                })
                            }
                            {
                                type === ITableType.element &&
                                this.props.tableBody
                            }
                        </TableBody>
                    }
                </Table>
            </Paper>
        );
    }




}
export default withStyles(styles, { withTheme: true })(injectIntl(TableComponent));