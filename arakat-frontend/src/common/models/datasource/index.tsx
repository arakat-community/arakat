/**
 * datasource item type. that type helps what kind of data source item dropped on worksheet item
 */
export enum DataSourceItemType {
    Dimension,
    Measurement,
}

/**
 * datasource item
 */
export interface IDataSourceItem {
    dataSourceType: DataSourceItemType;
    field: string;
    type: DataSourceType;
}

/**
 * describes datasource which will be used while creating worksheets
 */
export interface IDataSource {
    dimensions: IDataSourceItem[];
    measurements: IDataSourceItem[];
    data: any[];
}

/**
 * data types for datasource
 */
export enum DataSourceType {
    String = "string",
    Date = "Date",
    Boolean = "boolean",
    Number = "number",
}
