import { Column } from "@devexpress/dx-react-grid";
import { GridColumnType } from "./type";
import { IGridColumnBooleanTypeDescription } from "./boolean-type-description";
import { ISelectFilterGridColumn } from "./select-filter";

/**
 * grid column interface
 */
export interface IGridColumn extends Column {
    booleanTypeDescription?: IGridColumnBooleanTypeDescription;
    selectFilterGridColumn?: ISelectFilterGridColumn;
    type: GridColumnType;
}