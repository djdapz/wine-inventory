import TextField from "@material-ui/core/TextField";
import * as React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {FormControl, OutlinedInput} from "@material-ui/core";
import styled from "styled-components";

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
    variant="outlined"
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
    onChange: (val: number | undefined) => void,
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
    formField: string,
    onChange: (val: string) => void,
    value?: string,
    children?: React.ReactNode
    elements: { label: string, list: T[] }[],
    getValueFromElement: (el: T) => string,
    label?: string
}) => <FormControl variant="outlined"
                   className={`${props.formField}-input create-wine-form-input`}>
    <InputLabel htmlFor="country-dropdown">Country</InputLabel>
    <Select native
            data-cy={props.label}
            value={props.value}
            onChange={(event) => props.onChange(event.target.value)}
            input={<OutlinedInput labelWidth={"country".length * 8}
                                  name="country"
                                  id="country-dropdown"/>}>
        <option value=""/>
        {props.elements
            .map(el =>
                <optgroup label={el.label} key={el.label}>
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
</FormControl>;

const FormControllFullWitdh = styled(FormControl)`
 &&{
  width: 100%
 }
`
export const Dropdown = <T extends any>(
    props: {
        label: string,
        identifier: string,
        onChange: (val: T) => void,
        value?: string,
        children?: React.ReactNode
        options: T[],
        default?: T,
        optionToLabel: (it: T) => string,
        convertFromStringToType: (it: string) => T
    }
) =>
    <FormControllFullWitdh variant="outlined"
                           className={`${props.identifier}-input create-wine-form-input`}>
        <InputLabel htmlFor="country-dropdown">{props.label}</InputLabel>
        <Select native
                value={props.value}
                data-cy={props.label}
                onChange={(event) => props.onChange(props.convertFromStringToType(event.target.value))}
                input={<OutlinedInput labelWidth={props.label.length * 8}
                                      name={`${props.identifier}`}
                                      id={`${props.identifier}-dropdown`}/>}>
            {props.default ?
                <option value={props.default.toString()}
                        key={`${props.default}`}>
                    {props.optionToLabel(props.default)}
                </option> : ""}

            {props.options
                .filter(it => it !== props.default)
                .map(it => <option value={it.toString()}
                                   key={`${it}`}>
                    {props.optionToLabel(it)}
                </option>)}
        </Select>
    </FormControllFullWitdh>;

