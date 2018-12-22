import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {
    addBottleSizeToWineRequest,
    addCellarLocationToWineRequest,
    addCountryToWineRequest,
    addNotesToWineRequest,
    addOriginalWoodenCaseToWineRequest,
    addProducerToWineRequest,
    addQuantityToWineRequest,
    addTypeToWineRequest,
    addYearToWineRequest,
    closeCreateWineForm,
    openCreateWineForm,
    submitCreateWine
} from "../redux/CreateWine.actions";
import Button from "@material-ui/core/Button/Button";
import Cancel from "@material-ui/icons/Cancel";
import {BottomButton} from "./NewWineButton";
import {CreateWineRequest, isWineRequestReadyToSubmit} from "../domain/CreateWine.types";
import {Country} from "../redux/Country.actions";
import {StoreType} from "../index";
import styled from "styled-components";
import Drawer from "@material-ui/core/Drawer/Drawer";
import {Dropdown, MultiDropDown, NumberInput, TextInput} from "./FormComponents";
import {Countries} from "../redux/Country.reducer";
import {MuiThemeProvider} from "@material-ui/core";
import {whiteInputs} from "./SearchBar";
import Checkbox from "@material-ui/core/es/Checkbox";
import FormControlLabel from "@material-ui/core/es/FormControlLabel";

interface CreateWineFormProps {
    createWineFormRequest: CreateWineRequest | null
    countries: Countries
    changeType: (type: string) => void
    changeYear: (year?: number) => void
    changeQuantity: (quantity?: number) => void
    changeProducer: (producer: string) => void
    changeCountry: (country: string) => void
    changeCellarLocation: (cellarLocation: string) => void
    changeNotes: (notes: string) => void,
    changeBottleSize: (bottleSize: number) => void,
    changeOriginalWoodenCase: (owc: boolean) => void,
    submit: (createWineRequest: CreateWineRequest) => void,
    openForm: () => void
    closeForm: () => void
}

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 1rem;
  height: 100%;
  background-image: linear-gradient(to bottom right,#8e2dfa,rgb(160, 44, 157));
  .create-wine-form-input{
    flex-shrink: 0;
  }
`;


const CreateWineForm = (props: CreateWineFormProps) =>
    <Drawer
        anchor="right"
        open={props.createWineFormRequest !== null && props.createWineFormRequest !== undefined}
        onClose={() => null}>
        {props.createWineFormRequest ?
            <StyledForm id={"create-wine-form"}>
                <MuiThemeProvider theme={whiteInputs}>
                    <MultiDropDown
                        onChange={props.changeCountry}
                        value={props.createWineFormRequest.country}
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
                        onChange={props.changeProducer}
                        label="Producer"
                        value={props.createWineFormRequest.producer}
                        className={'create-wine-form-input producer-input'}/>
                    <TextInput
                        onChange={props.changeType}
                        label="Type"
                        value={props.createWineFormRequest.type}
                        className={'create-wine-form-input type-input'}/>
                    <NumberInput
                        className={'create-wine-form-input year-input'}
                        label="Year"
                        value={props.createWineFormRequest.year}
                        onChange={props.changeYear}/>
                    <NumberInput
                        className={'create-wine-form-input quantity-input'}
                        label="Quantity"
                        value={props.createWineFormRequest.quantity}
                        onChange={props.changeQuantity}/>
                    <Dropdown label={"Bottle Size"}
                              formField={"bottle-size"}
                              onChange={props.changeBottleSize}
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
                        value={props.createWineFormRequest.cellarLocation}
                        onChange={props.changeCellarLocation}/>
                    <TextInput
                        className={'create-wine-form-input notes-input'}
                        label="Notes"
                        value={props.createWineFormRequest.notes}
                        onChange={props.changeNotes}/>
                    <FormControlLabel
                        control={
                            <Checkbox
                                className={'create-wine-form-input original-wooden-case-input'}
                                checked={props.createWineFormRequest.originalWoodenCase}
                                onChange={(it) => props.changeOriginalWoodenCase(it.target.checked)}
                                value="checkedA"
                                color={"primary"}
                            />
                        }
                        label="Original Wooden Case"
                    />

                </MuiThemeProvider>
                <Button disabled={!isWineRequestReadyToSubmit(props.createWineFormRequest)}
                        className={"submit-button"}
                        color={"secondary"}
                        variant={'contained'}
                        onClick={() => props.submit(props.createWineFormRequest!)}>
                    Create
                </Button>
                <BottomButton>
                    <Button
                        id={"cancel-new-wine"}
                        variant={'fab'}
                        color={"secondary"}
                        onClick={props.closeForm}>
                        <Cancel/>
                    </Button>
                </BottomButton>
            </StyledForm> : <StyledForm/>}

    </Drawer>;

const mapStateToProps = (state: StoreType) => ({
    createWineFormRequest: state.createWineForm,
    countries: state.countries
});

const mapActionsToProps = (dispatch: Dispatch) => ({
    changeType: (type: string) => dispatch(addTypeToWineRequest(type)),
    changeYear: (year: number) => dispatch(addYearToWineRequest(year)),
    changeQuantity: (quantity: number) => dispatch(addQuantityToWineRequest(quantity)),
    changeProducer: (producer: string) => dispatch(addProducerToWineRequest(producer)),
    changeCountry: (country: string) => dispatch(addCountryToWineRequest(country)),
    changeCellarLocation: (cellarLocation: string) => dispatch(addCellarLocationToWineRequest(cellarLocation)),
    changeNotes: (notes: string) => dispatch(addNotesToWineRequest(notes)),
    changeBottleSize: (bottleSize: number) => dispatch(addBottleSizeToWineRequest(bottleSize)),
    changeOriginalWoodenCase: (owc: boolean) => dispatch(addOriginalWoodenCaseToWineRequest(owc)),
    submit: (createWineRequest: CreateWineRequest) => submitCreateWine(dispatch, createWineRequest),
    openForm: () => dispatch(openCreateWineForm()),
    closeForm: () => dispatch(closeCreateWineForm())
});

export default connect(mapStateToProps, mapActionsToProps)(CreateWineForm)