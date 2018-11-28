import { NodeType } from "../enums/nodeType";

/**
 * Chart Decision tre model
 */
export interface IChartDecisionTreeModel {
    name: string;                               // name of node
    id: string;                                 // id of the node 
    children?: IChartDecisionTreeModel[];       // children of the parent node
    type?: string[];                            // type array of the node (if it exists it means that the node is leaf)
    key?: string;                               // key of the chart item
}

/**
 * Tree data model
 * db nodes, db tables, and table fields
 */
export interface ITreeDataModel {
    key: string;                    // key of the parent node: preferably the db name or table name
    title: string;                  // name of the table or db 
    children?: ITreeDataModel[];    // children of the db (tables) or table (fields)
    type?: NodeType;                // type of node (db, table, or field)
}

/**
 * Selected database tables and fields
 */
export interface ISelectedIDBMSModel {
    appId: string;              // selected app id
    tablePath: string;          // selected table model
    column: ITableField;        // selected columns of the table
}

/**
 * field of the table
 */
export interface ITableField {
    name: string;    // name of the field              
    type?: string;   // type of the field    
}

export interface IDBMSModel {
    appId: string;
    tablePathList: ITable[];
}

/**
 * Database table Models 
 */
export interface ITable {
    id: number;
    tablePath: string;
}

