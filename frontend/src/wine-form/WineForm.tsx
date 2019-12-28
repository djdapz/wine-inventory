import * as React from "react";
import {useState} from "react";
import Button from "@material-ui/core/Button";
import {WineRequest} from "./CreateWine.types";
import {Country} from "./Country.actions";
import {Dropdown, MultiDropDown, NumberInput, TextInput} from "../shared/FormComponents";
import {Countries} from "./Country.reducer";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import styled from "styled-components";

export interface WineFormProps {
    submit: (createWineRequest: WineRequest) => void,
    wineFormRequest?: WineRequest,
    countries: Countries,
    canBeSubmitted: (createWineRequest: WineRequest) => boolean,
    buttonText: string
}

const CheckboxContainer = styled.div`
  padding: .5rem 0;
`

const Padding = styled.div`
  margin-top: .5rem;
`

export const WineForm = (props: WineFormProps) => {

    const [country, setCountry] = useState<string | undefined>(props.wineFormRequest?.country || undefined)
    const [producer, setProducer] = useState<string | undefined>(props.wineFormRequest?.producer || undefined)
    const [type, setType] = useState<string | undefined>(props.wineFormRequest?.type || undefined)
    const [year, setYear] = useState<number | undefined>(props.wineFormRequest?.year || undefined)
    const [quantity, setQuantity] = useState<number | undefined>(props.wineFormRequest?.quantity || undefined)
    const [bottleSize, setBottleSize] = useState<number | undefined>(props.wineFormRequest?.bottleSize || undefined)
    const [cellarLocation, setCellarLocation] = useState<string | undefined>(props.wineFormRequest?.cellarLocation || undefined)
    const [notes, setNotes] = useState<string | undefined>(props.wineFormRequest?.notes || undefined)
    const [originalWoodenCase, setOriginalWoodenCase] = useState<boolean | undefined>(props.wineFormRequest?.originalWoodenCase || undefined)

    const request: WineRequest = {
        country,
        producer,
        type,
        year,
        quantity,
        bottleSize,
        cellarLocation,
        notes,
        originalWoodenCase
    }
    return <>
        <MultiDropDown
            onChange={setCountry}
            value={country}
            elements={[
                {
                    list: props.countries.top5,
                    label: "Most Popular"
                },
                {
                    list: props.countries.all,
                    label: "All"
                }
            ]}
            getValueFromElement={(country: Country) => country.name}
            formField={"country"}/>
        <TextInput
            onChange={setProducer}
            label="Producer"
            value={producer}
            className={'create-wine-form-input producer-input'}/>
        <TextInput
            onChange={setType}
            label="Type"
            value={type}
            className={'create-wine-form-input type-input'}/>
        <NumberInput
            className={'create-wine-form-input year-input'}
            label="Year"
            value={year}
            onChange={setYear}/>
        <NumberInput
            className={'create-wine-form-input quantity-input'}
            label="Quantity"
            value={quantity}
            onChange={setQuantity}/>

        <Padding>
            <Dropdown
                cy={'bottle-size'}
                label={"Bottle Size"}
                identifier={"bottle-size"}
                onChange={setBottleSize}
                options={[375, 750, 1500, 3000, 6000]}
                default={750}
                optionToLabel={(option: number) => {
                    if (option > 1000) {
                        return `${option / 1000}L`
                    }
                    return `${option} mL`
                }}
                convertFromStringToType={(option: string) => parseInt(option)}/>
        </Padding>
        <TextInput
            className={'create-wine-form-input cellar-location-input'}
            label="Cellar Location"
            value={cellarLocation}
            onChange={setCellarLocation}/>
        <TextInput
            className={'create-wine-form-input notes-input'}
            label="Notes"
            value={notes}
            onChange={setNotes}/>
        <CheckboxContainer>
            <FormControlLabel
                control={
                    <Checkbox
                        className={'create-wine-form-input original-wooden-case-input'}
                        checked={originalWoodenCase}
                        onChange={(it) => setOriginalWoodenCase(it.target.checked)}
                        value="checkedA"
                        color={"primary"}
                    />
                }
                label="Original Wooden Case"
            />
        </CheckboxContainer>

        <Button disabled={!props.canBeSubmitted(request)}
                className={"submit-button"}
                color={"primary"}
                variant={'contained'}
                onClick={() => props.submit(request)}>
            {props.buttonText}
        </Button>
    </>;
}