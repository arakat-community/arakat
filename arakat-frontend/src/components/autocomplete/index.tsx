import { WithStyles, withStyles } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import React, { Component } from "react";
import { defineMessages, InjectedIntlProps, injectIntl } from "react-intl";
import { IAutoCompleteSuggestion } from "../../common/models/autocomplete/suggestion";
import { SelectWrapped } from "./hoc";
import {styles} from "./style";

export interface IAutoCompleteProps {
    id: string;
    single: boolean;
    selectedValueLabel?: JSX.Element;
    suggestions: any;
    onValueChange?: (value: any) => void;
    value?: string;
    fullWidth?: boolean;
    primitiveValue: boolean;
    labelProp: string;
    required?: boolean;
}

interface IAutoCompleteState {
  selectedValue: any;
}

type AllProps = IAutoCompleteProps & InjectedIntlProps & WithStyles<"root">;

const autocompleteMessages: any = defineMessages({
  placeholder: {
      id: "form.elements.autocomplete.placeholder",
  },
  noResult: {
    id: "form.elements.autocomplete.no.result",
  },
});

/**
 * autocomplete input class
 * from https://material-ui.com/demos/autocomplete/
 */
class AutoCompleteInput extends Component<AllProps, IAutoCompleteState> {

    constructor(props: AllProps) {
      super(props);

      this.state = {
        selectedValue: props.value,
      };
    }

    /**
     * renders output
     */
    public render(): JSX.Element {
      const {selectedValue} = this.state;

      const { classes, suggestions, single, id, intl, fullWidth, primitiveValue, labelProp, required } = this.props;

      return (
        <div
          className={classes.root}
        >
          <Input
            fullWidth={fullWidth}
            inputComponent={SelectWrapped}
            value={selectedValue}
            onChange={this.handleChange("selectedValue")}
            placeholder={`${intl.formatMessage(autocompleteMessages.placeholder)}${required ? "*" : ""}`}
            name={id}
            inputProps={{
              classes,
              id: {id},
              instanceId: {id},
              multi: !single,
              options: suggestions,
              simpleValue: primitiveValue,
              openOnClick: false,
              labelKey: labelProp,
              matchProp: "label",
              valueKey: labelProp,
              filterOptions: true,
              required,
              noResultsText: intl.formatMessage(autocompleteMessages.noResult),
            }}
          />
        </div>
      );
    }

    private handleChange = (name) => (selectedSuggestion) => {
        const { onValueChange } = this.props;

        const value: any = selectedSuggestion;

        this.setState({
          selectedValue: value,
        });

        if (onValueChange) {
          onValueChange(value);
        }
      }
  }

export default withStyles(styles, {withTheme: true})(injectIntl(AutoCompleteInput));
