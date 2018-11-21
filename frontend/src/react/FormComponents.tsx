import TextField from "@material-ui/core/TextField/TextField";
import * as React from "react";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import FilledInput from "@material-ui/core/es/FilledInput/FilledInput";
import {withStyles} from "@material-ui/core";

const orEmpty = (val?: any) => (val === null || val === undefined) ? "" : val;

const whiteFieldStyle = {
    backgroundColor: "white",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    width: "15rem"
};

const WhiteTextField = withStyles({
    root: {...whiteFieldStyle}
})(TextField);

const WhiteFormControl = withStyles({
    root: {...whiteFieldStyle}
})(FormControl);

const BaseTextField = <T extends any>(props: {
    value?: T,
    label: string,
    className: string,
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
}) => <WhiteTextField
    className={props.className}
    label={props.label}
    value={orEmpty(props.value)}
    onChange={props.onChange}
    margin="normal"
    variant="filled"
/>;


export const TextInput = (props: {
    onChange: (val: string) => void,
    value?: string,
    label: string,
    className: string
}) => <BaseTextField
    className={props.className}
    label={props.label}
    value={props.value}
    onChange={event => props.onChange(event.target.value)}
/>;

export const NumberInput = (props: {
    onChange: (val: number) => void,
    value?: number,
    label: string,
    className: string
}) => <BaseTextField
    className={props.className}
    label={props.label}
    value={props.value}
    onChange={validateNumericInputFor(props.onChange)}
/>;

export const validateNumericInputFor = (onChange: (val: number | undefined) => void) => (event: { target: { value: any } }) => {
    const passedValue = event.target.value;
    if (passedValue === "") {
        onChange(undefined)
    } else if (!isNaN(parseInt(passedValue))) {
        onChange(parseInt(event.target.value))
    }
};

export const MultiDropDown = <T extends any>(props: {
    onChange: (val: string) => void,
    value?: string,
    children?: React.ReactNode
    elements: { label: string, list: T[] }[],
    getValueFromElement: (el: T) => string
}) => <WhiteFormControl variant="filled"
                        className={'country-input create-wine-form-input'}>
    <InputLabel htmlFor="country-dropdown">Country</InputLabel>
    <Select native
            value={props.value}
            onChange={(event) => props.onChange(event.target.value)}
            input={<FilledInput name="country"
                                id="country-dropdown"/>}>
        <option value=""/>
        {props.elements
            .map(el =>
                <optgroup label={el.label}> key={el.label}
                    {el.list
                        .map(props.getValueFromElement)
                        .map(value =>
                            <option value={value}
                                    key={`${value}-${el.label}`}>
                                {value}
                            </option>
                        )}
                </optgroup>)}
    </Select>
</WhiteFormControl>;