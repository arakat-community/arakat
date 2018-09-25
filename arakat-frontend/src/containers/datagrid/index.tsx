import React from "react";
import DataGridComponent, { IDataGridProps } from "../../components/datagrid";

const DataGridContainer: (props: IDataGridProps) => JSX.Element = (props) => ( <DataGridComponent {...props}/>);

export default DataGridContainer;
