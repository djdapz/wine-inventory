import TextField from "@material-ui/core/TextField/TextField";
import * as React from "react";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import FilledInput from "@material-ui/core/es/FilledInput/FilledInput";

const orEmpty = (val?: any) => (val === null || val === undefined) ? "" : val;

const BaseTextField = <T extends any>(props: {
    value?: T,
    label: string,
    className: string,
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
}) => <TextField
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
    onChange={event => {
        const passedValue = event.target.value;
        if (passedValue === "") {
            props.onChange(undefined as any)
        } else if (!isNaN(parseInt(passedValue))) {
            props.onChange(parseInt(event.target.value))
        }
    }}
/>;

export const MultiDropDown = <T extends any>(props: {
    onChange: (val: string) => void,
    value?: string,
    children?: React.ReactNode
    elements: { label: string, list: T[] }[],
    getValueFromElement: (el: T) => string
}) => <FormControl variant="filled"
                   className={'country-input create-wine-form-input'}>
    <InputLabel htmlFor="country-dropdown">Country</InputLabel>
    <Select
        native
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        input={<FilledInput name="country"
                            id="country-dropdown"/>}>
        <option value=""/>
        {props.elements
            .map(el =>
                <optgroup label={el.label}>}
                    {el.list.map(props.getValueFromElement)
                        .map(value =>
                            <option value={value} key={`${value}-${el.label}`}>
                                {value}
                            </option>
                        )}
                </optgroup>)}
    </Select>
</FormControl>;
