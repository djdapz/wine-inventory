import * as React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import {CreateWineRequest} from "./CreateWine.types";
import AddIcon from '@material-ui/icons/Add';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {
    addCountryToWineRequest,
    addProducerToWineRequest,
    addQuantityToWineRequest,
    addTypeToWineRequest,
    addYearToWineRequest,
    openCreateWineForm,
    submitCreateWine
} from "./CreateWine.actions";
import Button from "@material-ui/core/Button/Button";
import styled from "styled-components";

interface CreateWineFormProps {
    createWineFormRequest: CreateWineRequest | null
    changeType: (type: string) => void
    changeYear: (year: number) => void
    changeQuantity: (quantity: number) => void
    changeProducer: (producer: string) => void
    changeCountry: (country: string) => void
    submit: (createWineRequest: CreateWineRequest) => void,
    openForm: () => void
}

let handleNum = (fun: (n: number) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value);
    if (!isNaN(val)) {
        fun(val)
    }
};

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const CreateWineForm = (props: CreateWineFormProps) => props.createWineFormRequest ?
    <StyledForm id="create-wine-form">
        <TextField
            className={'country-input'}
            label="Country"
            value={props.createWineFormRequest.country}
            onChange={(event) => props.changeCountry(event.target.value)}
            margin="normal"
            variant="outlined"
        />
        <TextField
            className={'producer-input'}
            label="Producer"
            value={props.createWineFormRequest.producer}
            onChange={(event) => props.changeProducer(event.target.value)}
            margin="normal"
            variant="outlined"
        />
        <TextField
            className={'type-input'}
            label="Type"
            value={props.createWineFormRequest.type}
            onChange={(event) => props.changeType(event.target.value)}
            margin="normal"
            variant="outlined"
        />
        <TextField
            className={'year-input'}
            label="Year"
            value={props.createWineFormRequest.year}
            onChange={handleNum(props.changeYear)}
            margin="normal"
            variant="outlined"
        />
        <TextField
            className={'quantity-input'}
            label="Quantity"
            value={props.createWineFormRequest.quantity}
            onChange={handleNum(props.changeQuantity)}
            margin="normal"
            variant="outlined"/>
        <Button disabled={!props.createWineFormRequest.isComplete()}
                className={"submit-button"}
                variant={'contained'}
                color={"primary"}
                onClick={() => props.submit(props.createWineFormRequest!)}>
            Create
        </Button>
    </StyledForm>
    : <Button variant={'fab'}
              color={"primary"}
              onClick={() => props.openForm()}><AddIcon/></Button>;

const mapStateToProps = (state: any) => ({
    createWineFormRequest: state.createWineForm
});

const mapActionsToProps = (dispatch: Dispatch) => ({
    changeType: (type: string) => dispatch(addTypeToWineRequest(type)),
    changeYear: (year: number) => dispatch(addYearToWineRequest(year)),
    changeQuantity: (quantity: number) => dispatch(addQuantityToWineRequest(quantity)),
    changeProducer: (producer: string) => dispatch(addProducerToWineRequest(producer)),
    changeCountry: (country: string) => dispatch(addCountryToWineRequest(country)),
    submit: (createWineRequest: CreateWineRequest) => submitCreateWine(dispatch, createWineRequest),
    openForm: () => dispatch(openCreateWineForm())
});

export default connect(mapStateToProps, mapActionsToProps)(CreateWineForm)