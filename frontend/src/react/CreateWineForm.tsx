import * as React from "react";
import TextField from "@material-ui/core/TextField/TextField";
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
import Select from "@material-ui/core/Select/Select";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {CreateWineRequest, isWineRequestReadyToSubmit} from "../domain/CreateWine.types";
import {Country} from "../redux/Country.actions";
import {StoreType} from "../index";
import FilledInput from "@material-ui/core/es/FilledInput/FilledInput";
import styled from "styled-components";
import Drawer from "@material-ui/core/Drawer/Drawer";

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

let handleNum = (fun: (n?: number) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const passedValue = event.target.value;
    if (passedValue === "") {
        fun(undefined)
    } else if (!isNaN(parseInt(passedValue)) || passedValue === "") {
        fun(parseInt(event.target.value))
    }
};

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to bottom right,#8e2dfa,rgb(160, 44, 157));
  padding: 1rem;
  height: 100%;
  max-width:10rem;
  input{
    background-color: white;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .country-input,  .country-input > div{
    background-color: white;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
`;

const renderMenuItems = (countries: Country[]) => countries.map(country =>
    <option key={country.name}
            value={country.name}>{country.name}</option>);


const CreateWineForm = (props: CreateWineFormProps) =>
    <Drawer
        anchor="right"
        open={props.createWineFormRequest !== null && props.createWineFormRequest !== undefined}
        onClose={() => null}>
        {props.createWineFormRequest ?
            <StyledForm>
                <FormControl variant="filled"
                             className={'country-input'}>
                    <InputLabel htmlFor="country-dropdown">Country</InputLabel>
                    <Select
                        native
                        value={props.createWineFormRequest.country}
                        onChange={(event) => props.changeCountry(event.target.value)}
                        input={<FilledInput name="country"
                                            id="country-dropdown"/>}
                    >
                        <option value=""/>
                        {renderMenuItems(props.countries)}
                    </Select>
                </FormControl>
                <TextField
                    className={'producer-input'}
                    label="Producer"
                    value={props.createWineFormRequest.producer}
                    onChange={(event) => props.changeProducer(event.target.value)}
                    margin="normal"
                    variant="filled"
                />
                <TextField
                    className={'type-input'}
                    label="Type"
                    value={props.createWineFormRequest.type}
                    onChange={(event) => props.changeType(event.target.value)}
                    margin="normal"
                    variant="filled"
                />
                <TextField
                    className={'year-input'}
                    label="Year"
                    value={props.createWineFormRequest.year}
                    onChange={handleNum(props.changeYear)}
                    margin="normal"
                    variant="filled"
                />
                <TextField
                    className={'quantity-input'}
                    label="Quantity"
                    value={props.createWineFormRequest.quantity}
                    onChange={handleNum(props.changeQuantity)}
                    margin="normal"
                    variant="filled"/>
                <TextField
                    className={'cellar-location-input'}
                    label="Cellar Location"
                    value={props.createWineFormRequest.cellarLocation}
                    onChange={(event) => props.changeCellarLocation(event.target.value)}
                    margin="normal"
                    variant="filled"/>
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
    submit: (createWineRequest: CreateWineRequest) => submitCreateWine(dispatch, createWineRequest),
    openForm: () => dispatch(openCreateWineForm()),
    closeForm: () => dispatch(closeCreateWineForm())
});

export default connect(mapStateToProps, mapActionsToProps)(CreateWineForm)