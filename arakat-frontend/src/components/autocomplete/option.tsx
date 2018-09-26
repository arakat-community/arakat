import MenuItem from "@material-ui/core/MenuItem";
import React, { Component } from "react";

export interface IAutoCompleteOptionProps {
    isFocused?: boolean;
    isSelected?: boolean;
    onFocus?: (event: any) => void;
    onSelect?: (option: AutoCompeleteOption, event: any) => void;
    option?: AutoCompeleteOption;
}

type AllProps = IAutoCompleteOptionProps;

/**
 * auto complete's options that will be listed on suggestions
 */
export class AutoCompeleteOption extends Component<AllProps, {}> {
    /**
     * renders output
     */
    public render(): JSX.Element {
      const { children, isFocused, isSelected, onFocus } = this.props;

      return (
        <MenuItem
          onFocus={onFocus}
          selected={isFocused}
          onClick={this.handleClick}
          component="div"
          style={{
            fontWeight: isSelected ? 500 : 400,
          }}
        >
          {children}
        </MenuItem>
      );
    }

    private handleClick = (event) => {
      this.props.onSelect(this.props.option, event);
    }

  }
