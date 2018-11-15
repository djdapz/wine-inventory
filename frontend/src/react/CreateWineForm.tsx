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
    addYearToWineRequest, closeCreateWineForm,
    openCreateWineForm,
    submitCreateWine
} from "../redux/CreateWine.actions";
import Button from "@material-ui/core/Button/Button";
import styled from "styled-components";
import Cancel from "@material-ui/icons/Cancel";
import {BottomButton} from "./NewWineButton";
import Select from "@material-ui/core/Select/Select";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {CreateWineRequest} from "../domain/CreateWine.types";
import {Country} from "../redux/Country.actions";
import {StoreType} from "../index";
import FilledInput from "@material-ui/core/es/FilledInput/FilledInput";

interface CreateWineFormProps {
    createWineFormRequest: CreateWineRequest | null
    countries: Country[]
    changeType: (type: string) => void
    changeYear: (year: number) => void
    changeQuantity: (quantity: number) => void
    changeProducer: (producer: string) => void
    changeCountry: (country: string) => void
    changeCellarLocation: (cellarLocation: string) => void
    submit: (createWineRequest: CreateWineRequest) => void,
    openForm: () => void
    closeForm: () => void
}

let handleNum = (fun: (n: number) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value);
    if (!isNaN(val)) {
        fun(val)
    }
};

interface Collapsable {
    isCollapsed: boolean
}

const StyledForm = styled.div<Collapsable>`
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to bottom right,#8e2dfa,rgb(160, 44, 157));
  padding: ${p => p.isCollapsed ? 0 : "1rem"};
  position: fixed;
  right: 0;
  height: 100%;
  max-width: ${p => p.isCollapsed ? 0 : "10rem"};
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

const CreateWineForm = (props: CreateWineFormProps) => props.createWineFormRequest ?
    <StyledForm id="create-wine-form"
                isCollapsed={false}>
        <BottomButton>
            <Button
                id={"cancel-new-wine"}
                variant={'fab'}
                color={"secondary"}
                onClick={props.closeForm}>
                <Cancel/>
            </Button>
        </BottomButton>

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
        <Button disabled={!props.createWineFormRequest.isComplete()}
                className={"submit-button"}
                color={"secondary"}
                variant={'contained'}
                onClick={() => props.submit(props.createWineFormRequest!)}>
            Create
        </Button>
    </StyledForm>
    : <div/>;

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