import { WithStyles, withStyles } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import CancelIcon from "@material-ui/icons/Cancel";
import ClearIcon from "@material-ui/icons/Clear";
import React from "react";
import Select from "react-select";
import {AutoCompeleteOption} from "./option";
import {styles} from "./style";

interface IValueComponent {
    children?: any;
    onRemove?: (value: any) => void;
    value?: any;
}

type AllType = IValueComponent & WithStyles<"chip">;

const ValueComponent: React.SFC<IValueComponent> = ({classes, ...props}: AllType) => {
    const { value, children, onRemove } = props;

    // tslint:disable-next-line:typedef
    const onDelete = (event) => {
      event.preventDefault();
      event.stopPropagation();
      onRemove(value);
    };

    if (onRemove) {
      return (
        <Chip
          tabIndex={-1}
          label={children}
          className={classes.chip}
          deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
          onDelete={onDelete}
        />
      );
    }

    return <div className="Select-value">{children}</div>;
  };

const ValueComponentStyled: any = withStyles(styles, {withTheme: true})(ValueComponent);
  /**
   * wrapped class for select autocomplete
   * @param props props of selected wrapped
   */
export function SelectWrapped(props: any): JSX.Element {

    // tslint:disable-next-line:typedef
    const renderArrow = (arrowProps: any) => arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
    // tslint:disable-next-line:typedef
    const renderClear = () => <ClearIcon />;

    const { classes, ...other } = props;

    return (
      <Select
        optionComponent={AutoCompeleteOption}
        noResultsText={<Typography>{"No results found"}</Typography>}
        arrowRenderer={renderArrow}
        clearRenderer={renderClear}
        valueComponent={ValueComponentStyled}
        {...other}
      />
    );
  }
