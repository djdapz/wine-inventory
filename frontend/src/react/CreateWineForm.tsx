import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {
    addCellarLocationToWineRequest,
    addCountryToWineRequest,
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
import {DropDown, NumberInput, TextInput} from "./FormComponents";

interface CreateWineFormProps {
    createWineFormRequest: CreateWineRequest | null
    countries: Country[]
    changeType: (type: string) => void
    changeYear: (year?: number) => void
    changeQuantity: (quantity?: number) => void
    changeProducer: (producer: string) => void
    changeCountry: (country: string) => void
    changeCellarLocation: (cellarLocation: string) => void
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
  input, .country-input,  .country-input > div{
    background-color: white;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
`;

const CreateWineForm = (props: CreateWineFormProps) =>
    <Drawer
        anchor="right"
        open={props.createWineFormRequest !== null && props.createWineFormRequest !== undefined}
        onClose={() => null}>
        {props.createWineFormRequest ?
            <StyledForm id={"create-wine-form"}>
                <DropDown
                    onChange={props.changeCountry}
                    value={props.createWineFormRequest.country}
                    elements={props.countries}
                    getValueFromElement={(country: Country) => country.name}/>
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
                <TextInput
                    className={'create-wine-form-input cellar-location-input'}
                    label="Cellar Location"
                    value={props.createWineFormRequest.cellarLocation}
                    onChange={props.changeCellarLocation}/>
                <Button disabled={!isWineRequestReadyToSubmit(props.createWineFormRequest)}
                        className={"submit-button"}
                        color={"secondary"}
                        variant={'contained'}
                        onClick={() => props.submit(props.createWineFormRequest!)}>
                    Create
                </Button>
            </StyledForm> : <StyledForm/>}
        <BottomButton>
            <Button
                id={"cancel-new-wine"}
                variant={'fab'}
                color={"secondary"}
                onClick={props.closeForm}>
                <Cancel/>
            </Button>
        </BottomButton>
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
    submit: (createWineRequest: CreateWineRequest) => submitCreateWine(dispatch, createWineRequest),
    openForm: () => dispatch(openCreateWineForm()),
    closeForm: () => dispatch(closeCreateWineForm())
});

export default connect(mapStateToProps, mapActionsToProps)(CreateWineForm)