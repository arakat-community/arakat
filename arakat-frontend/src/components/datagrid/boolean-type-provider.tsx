import { DataTypeProvider, DataTypeProviderProps } from "@devexpress/dx-react-grid";
import { Input, MenuItem, Select, Typography } from "@material-ui/core";
import * as React from "react";
import { IGridColumn } from "../../common/models/grid-column";
import { IGridColumnBooleanTypeDescription } from "../../common/models/grid-column/boolean-type-description";
import { GridColumnType } from "../../common/models/grid-column/type";

export interface IBooleanTypeProviderProps {
    columns: IGridColumn[];
    booleanTypeDescriptions: IGridColumnBooleanTypeDescription;
}

type AllProps = IBooleanTypeProviderProps;

const Formatter: (value: DataTypeProvider.ValueFormatterProps) => JSX.Element =
(value) => {
    const column: IGridColumn = value.column as IGridColumn;

    return (
        value.value ?
            <Typography>{column.booleanTypeDescription.enabledMessage}</Typography>
        :
            <Typography>{column.booleanTypeDescription.disabledMessage}</Typography>
        );
};

const BooleanSelectEditorBase: (props: DataTypeProvider.ValueEditorProps) => JSX.Element = (props) => {
    const {onValueChange, value} = props;

    const column: IGridColumn = props.column as IGridColumn;

    const handleChange: (event: any) => void = (event) => {
      const { value: targetValue } = event.target;
      if (targetValue.trim() === "") {
        onValueChange("");
        return;
      }
      onValueChange(targetValue);
    };

    return (
            <Select
                fullWidth={true}
                displayEmpty={true}
                name="filter"
                onChange={handleChange}
                value={value}
            >
                <MenuItem
                    value=""
                >
                    <em>
                        {column.selectFilterGridColumn.defaultName}
                    </em>
                </MenuItem>
                <MenuItem
                    value={"true"}
                >
                    {column.booleanTypeDescription.enabledMessage}
                </MenuItem>
                <MenuItem
                    value={"false"}
                >
                    {column.booleanTypeDescription.disabledMessage}
                </MenuItem>
            </Select>
    );
  };

export const BooleanTypeProvider: (props: AllProps) => JSX.Element = (props) => (
  <DataTypeProvider
    for={props.columns.filter((f) => f.type === GridColumnType.Boolean).map((k) => k.name)}
    formatterComponent={Formatter}
    editorComponent={BooleanSelectEditorBase}
    availableFilterOperations={[]}
  />
);
