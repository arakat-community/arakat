import React from "react";
import AutoCompleteComponent, { IAutoCompleteProps } from "../../components/autocomplete";

const AutoCompleteContainer: (props: IAutoCompleteProps) => JSX.Element = (props: IAutoCompleteProps) =>
(<AutoCompleteComponent {...props}/>);

export default AutoCompleteContainer;
