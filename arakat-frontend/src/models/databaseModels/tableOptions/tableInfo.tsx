
/**
 * Remote Database table data 
 */
export interface ITableData {
    [x: string]: IRowData[];
}

/**
 * Remote Database row data 
 */
export interface IRowData {
    [x: string]: IColumnData[];
}

/**
 * Column Data Model
 */
export interface IColumnData {
    columnName: string;
    value: any;
}

/**
 * Remote database table column data
 */
export interface IColumnInformation {
    column: string;
}

/**
 * Column data type
 */
export enum DatabaseColumnType {
    NUMBER = "number",
    STRING = "string",

}