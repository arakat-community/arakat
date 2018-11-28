import { Theme, WithStyles, withStyles } from "@material-ui/core";
import { MenuItem, Select } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

const style: any = (theme: Theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
    formControl: {
        marginBottom: "42px",
        minWidth: "100%",
    },
    inputLabel: {
        position: "inherit",
    },
});

export interface ISelectProps {
    formName?: string;
    placeHolder?: string;
    multipleSelection?: boolean;
    fullWidth?: boolean;
    autoWidth?: boolean;
    label?: string;
    id: string;
    options?: any[];
    optionKey?: string;
    value?: string;
    primitiveType: boolean;
    onChange?: (event: any) => void;
    onSelect?: (selectedItem: any) => void;
}

interface ISelectState {
    options: any[];
    selectedItem: any;
    id: number;
}

type Props = ISelectProps & WithStyles<"formControl" | "inputLabel">;

/**
 * select component
 */
class SelectComponent extends Component<Props, ISelectState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            options: props.options,
            selectedItem: undefined,
            id: undefined,
        };
    }

    /**
     * handles change
     */
    public onChange = (id: number, event: any) => {

        const selectedItem = this.props.options.find(
            (element) => element[this.props.value] ===
                (
                    this.props.primitiveType ? event.target.value : event.target.value[this.props.value]
                ),
        );

        this.setState(
            {
                selectedItem,
                id,
            },
            () => {
                this.props.onSelect(selectedItem);
            },
        );
    }

    /**
     * renders output
     */
    public render(): JSX.Element {
        const { options, selectedItem } = this.state;
        const { optionKey, value, autoWidth, multipleSelection, placeHolder, classes, id } = this.props;

        return (
            <FormControl
                className={classes.formControl}>
                <InputLabel className={classes.inputLabel}>
                    {
                        <FormattedMessage
                            id={placeHolder}
                        />
                    }
                </InputLabel>
                <Select
                    id={id}
                    onChange={this.onChange.bind(this, id)
                    }
                    value={selectedItem ? selectedItem[value] : ""}
                    autoWidth={autoWidth}
                    multiple={multipleSelection}
                >
                    {
                        options.map((item: any) =>
                            <MenuItem
                                id={item[optionKey]}
                                key={item[optionKey]}
                                value={item[value]}
                            >
                                {item[value]}
                            </MenuItem>
                        )
                    }
                </Select>
            </FormControl>
        );
    }
}

export default withStyles(style)(SelectComponent);
