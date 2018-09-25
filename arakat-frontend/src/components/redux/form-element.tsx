import { Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import React, {Component, ReactNode} from "react";
import { Field } from "redux-form";
import { IAutoCompleteSuggestion } from "../../common/models/autocomplete/suggestion";
import AutoCompleteComponent from "../autocomplete";
// import AutoCompleteComponent from "../../containers/autocomplete";

interface IFormElementProps {
    children: any;
    name: string;
    placeholder?: JSX.Element;
    required?: boolean;
    title?: JSX.Element;
}

interface ICheckboxFieldProps {
   input?: any;
   label?: string;
   meta?: IMetaFieldProps;
   properties?: ReactNode[];
   title?: JSX.Element;
}

interface ITextFieldProps {
    input?: any;
    meta?: IMetaFieldProps;
    properties?: ReactNode[];
}

interface IMetaFieldProps {
    touched: any;
    error: any;
    warning: any;
    invalid: any;
}

interface ISelectProps {
    fullWidth?: boolean;
    input?: any;
    meta?: IMetaFieldProps;
    placeholder?: JSX.Element;
    properties?: ReactNode[];
    required?: boolean;
    id?: string;
}

interface IRadioGroupProps {
    fullWidth?: boolean;
    input?: any;
    meta?: IMetaFieldProps;
    properties?: ReactNode[];
    id?: string;
    title?: JSX.Element;
}

interface ISwitchProps {
    fullWidth?: boolean;
    input?: any;
    meta?: IMetaFieldProps;
    properties?: ReactNode[];
    id?: string;
    title?: JSX.Element;
}

interface IAutoCompleteProps {
    fullWidth?: boolean;
    input?: any;
    meta?: IMetaFieldProps;
    properties?: ReactNode[];
    id?: string;
    single: boolean;
    multiLabel?: JSX.Element;
    suggestions: IAutoCompleteSuggestion[];
    primitiveValue: boolean;
    labelProp: string;
    required?: boolean;
}

const renderTextField: any = (props: ITextFieldProps) => (
    <TextField
        {...props.input}
        {...props.properties}
        error={props.meta.touched && props.meta.error}
        helperText={props.meta.touched && props.meta.error}
    />
  );

const renderCheckbox: any = (props: ICheckboxFieldProps) => (
    <FormControl
        component="fieldset"
        error={props.meta.invalid && props.meta.error}
    >
        <FormControlLabel
            control={
                        <Checkbox
                            {...props.input}
                            {...props.properties}
                            checked={props.input.value ? true : false}
                        />
                    }
            label={props.title}
        />
    {
        props.meta.invalid
        &&
        props.meta.error
        &&
        <FormHelperText>
        {
            props.meta.error
        }
        </FormHelperText>
    }
    </FormControl>
  );

const renderSelectField: any = (props: ISelectProps) => (
    <FormControl
        fullWidth={props.fullWidth}
        error={props.meta.touched && props.meta.error}
        required={props.required}
    >
        <InputLabel
            htmlFor={props.id}
        >
            {props.placeholder}
        </InputLabel>
        <Select
            {...props.input}
            {...props.properties}
        />
        {props.meta.touched && props.meta.error && <FormHelperText>{props.meta.error}</FormHelperText>}
    </FormControl>
  );

const renderRadioGroup: any = (props: IRadioGroupProps) => (
    <FormControl
        component="fieldset"
        error={props.meta.invalid && props.meta.error}
    >
        {
            props.title
                &&
            <FormLabel
                component="legend"
            >
                {props.title}
            </FormLabel>
        }
        <RadioGroup
          {...props.input}
          {...props.properties}
        />
        {
            props.meta.invalid
            &&
            props.meta.error
            &&
            <FormHelperText>
            {
                props.meta.error
            }
            </FormHelperText>
        }
    </FormControl>
  );

const renderSwitch: any = (props: ISwitchProps) => (
    <FormControl
        component="fieldset"
        error={props.meta.invalid && props.meta.error}
    >
            <FormControlLabel
                control={
                <Switch
                    {...props.input}
                    {...props.properties}
                />
                }
                label={props.title}
            />
            {
                props.meta.invalid
                &&
                props.meta.error
                &&
                <FormHelperText>
                {
                    props.meta.error
                }
                </FormHelperText>
            }
    </FormControl>
);

const renderAutocomplete: any = (props: IAutoCompleteProps) => (
    <FormControl
        style={{width: "100%"}}
        error={props.meta.invalid && props.meta.error}
    >
            <AutoCompleteComponent
                id={props.id}
                fullWidth={props.fullWidth}
                single={props.single}
                suggestions={props.suggestions}
                onValueChange={customComponentValueChanged.bind(this, props)}
                value={{val: props.input.value}}
                primitiveValue={props.primitiveValue}
                labelProp={props.labelProp}
                required={props.required}
                {...props.input}
                {...props.properties}
            />
            {props.meta.touched && props.meta.error && <FormHelperText>{props.meta.error}</FormHelperText>}
    </FormControl>
);

const customComponentValueChanged: any = (props: IAutoCompleteProps, value: any) => {
    props.input.onChange(value);
};

type AllTypes = IFormElementProps & ITextFieldProps & ICheckboxFieldProps;

  /**
   * wrapper class for material-ui redux-form elements
   */
class FormElement extends Component<AllTypes, {}> {
    /**
     * render method
     */
    public render(): JSX.Element {
        const {children, name, title = "", placeholder, required} = this.props;

        const {fullWidth= false, ...properties} = {...children.props};

        const newProps: any = {
            ...properties,
            fullWidth,
            id: name,
            name,
            placeholder: placeholder ? placeholder : children.placeholder,
        };

        switch (children.type) {
            case TextField:
                return (
                        <Field
                            name={name}
                            component={renderTextField}
                            properties={...newProps}
                        />
                        );
            case Checkbox:
                return (
                        <Field
                            name={name}
                            component={renderCheckbox}
                            properties={...newProps}
                            title={title}
                        />
                        );
            case Select:
                return (
                        <Field
                            name={name}
                            component={renderSelectField}
                            properties={...newProps}
                            id={name}
                            fullWidth={newProps.fullWidth}
                            placeholder={newProps.placeholder}
                            required={required}
                        />
                        );
            case RadioGroup:
                return (
                        <Field
                            name={name}
                            component={renderRadioGroup}
                            properties={...newProps}
                            id={name}
                            title={title}
                        />
                        );
            case Switch:
                return (
                        <Field
                            name={name}
                            component={renderSwitch}
                            properties={...newProps}
                            id={name}
                            title={title}
                        />
                        );
            case AutoCompleteComponent:
                return (
                        <Field
                            name={name}
                            component={renderAutocomplete}
                            fullWidth={newProps.fullWidth}
                            {...newProps}
                        />
                        );
        }
    }
}

export default FormElement;
