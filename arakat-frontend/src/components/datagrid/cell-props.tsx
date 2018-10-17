import { Table, Column } from "@devexpress/dx-react-grid";
import { IGridColumn } from "../../common/models/grid-column";

/**
 * hack for devexpress table cell's props
 */
export interface IDataCellProps extends Table.DataCellProps {
    value: any;
    row: any;
    column: IGridColumn;
}