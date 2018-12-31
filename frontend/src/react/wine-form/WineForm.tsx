import * as React from "react";
import Button from "@material-ui/core/Button/Button";
import {WineRequest} from "../../domain/CreateWine.types";
import {Country} from "../../redux/Country.actions";
import {Dropdown, MultiDropDown, NumberInput, TextInput} from "./FormComponents";
import {Countries} from "../../redux/Country.reducer";
import Checkbox from "@material-ui/core/es/Checkbox";
import FormControlLabel from "@material-ui/core/es/FormControlLabel";
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

export class WineForm extends React.Component<WineFormProps, { request: WineRequest }> {

    state = {
        request: this.props.wineFormRequest ? this.props.wineFormRequest : {}
    }

    updateCountry = (country: string) => this.setState({request: {...this.state.request, country}})
    updateProducer = (producer: string) => this.setState({request: {...this.state.request, producer}})
    updateType = (type: string) => this.setState({request: {...this.state.request, type}})
    updateYear = (year: number) => this.setState({request: {...this.state.request, year}})
    updateQuantity = (quantity: number) => this.setState({request: {...this.state.request, quantity}})
    updateBottleSize = (bottleSize: number) => this.setState({request: {...this.state.request, bottleSize}})
    updateCellarLocation = (cellarLocation: string) => this.setState({request: {...this.state.request, cellarLocation}})
    updateNotes = (notes: string) => this.setState({request: {...this.state.request, notes}})
    updateOriginalWoodenCase = (originalWoodenCase: boolean) => this.setState({
        request: {
            ...this.state.request,
            originalWoodenCase
        }
    })


    render(): React.ReactNode {
        return <React.Fragment>
            <MultiDropDown
                onChange={this.updateCountry}
                value={this.state.request.country}
                elements={[
                    {
                        list: this.props.countries.top5,
                        label: "Most Popular"
                    },
                    {
                        list: this.props.countries.all,
                        label: "All"
                    }
                ]}
                getValueFromElement={(country: Country) => country.name}
                formField={"country"}/>
            <TextInput
                onChange={this.updateProducer}
                label="Producer"
                value={this.state.request.producer}
                className={'create-wine-form-input producer-input'}/>
            <TextInput
                onChange={this.updateType}
                label="Type"
                value={this.state.request.type}
                className={'create-wine-form-input type-input'}/>
            <NumberInput
                className={'create-wine-form-input year-input'}
                label="Year"
                value={this.state.request.year}
                onChange={this.updateYear}/>
            <NumberInput
                className={'create-wine-form-input quantity-input'}
                label="Quantity"
                value={this.state.request.quantity}
                onChange={this.updateQuantity}/>
            <Dropdown label={"Bottle Size"}
                      formField={"bottle-size"}
                      onChange={this.updateBottleSize}
                      options={[375, 750, 1500, 3000, 6000]}
                      default={750}
                      optionToLabel={(option: number) => {
                          if (option > 1000) {
                              return `${option / 1000}L`
                          }
                          return `${option} mL`
                      }}
                      convertFromStringToType={(option: string) => parseInt(option)}/>
            <TextInput
                className={'create-wine-form-input cellar-location-input'}
                label="Cellar Location"
                value={this.state.request.cellarLocation}
                onChange={this.updateCellarLocation}/>
            <TextInput
                className={'create-wine-form-input notes-input'}
                label="Notes"
                value={this.state.request.notes}
                onChange={this.updateNotes}/>
            <CheckboxContainer>
            <FormControlLabel
                control={
                    <Checkbox
                        className={'create-wine-form-input original-wooden-case-input'}
                        checked={this.state.request.originalWoodenCase}
                        onChange={(it) => this.updateOriginalWoodenCase(it.target.checked)}
                        value="checkedA"
                        color={"primary"}
                    />
                }
                label="Original Wooden Case"
            />
            </CheckboxContainer>

            <Button disabled={!this.props.canBeSubmitted(this.state.request)}
                    className={"submit-button"}
                    color={"primary"}
                    variant={'contained'}
                    onClick={() => this.props.submit(this.state.request)}>
                {this.props.buttonText}
            </Button>
        </React.Fragment>;
    }
}