import * as React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import {CreateWineRequest} from "./CreateWine.types";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {
    addCountryToWineRequest,
    addProducerToWineRequest,
    addQuantityToWineRequest,
    addTypeToWineRequest,
    addYearToWineRequest,
    submitCreateWine
} from "./CreateWine.actions";
import Button from "@material-ui/core/Button/Button";

interface CreateWineFormProps {
    createWineFormRequest: CreateWineRequest
    changeType: (type: string) => void
    changeYear: (year: number) => void
    changeQuantity: (quantity: number) => void
    changeProducer: (producer: string) => void
    changeCountry: (country: string) => void
    submit: (createWineRequest: CreateWineRequest) => void
}

const CreateWineForm = (props: CreateWineFormProps) => (
    <div id="create-wine-form">
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
            onChange={(event) => props.changeYear(parseInt(event.target.value))}
            margin="normal"
            variant="outlined"
        />

        <TextField
            className={'quantity-input'}
            label="Quantity"
            value={props.createWineFormRequest.quantity}
            onChange={(event) => props.changeQuantity(parseInt(event.target.value))}
            margin="normal"
            variant="outlined"
        />

        <Button disabled={!props.createWineFormRequest.isComplete()} className={"submit-button"} variant="contained"
                color="primary" onClick={() => props.submit(props.createWineFormRequest)}>
            Create
        </Button>
    </div>
);

const mapStateToProps = (state: any) => ({
    createWineFormRequest: state.createWineForm
});

const mapActionsToProps = (dispatch: Dispatch) => ({
    changeType: (type: string) => dispatch(addTypeToWineRequest(type)),
    changeYear: (year: number) => dispatch(addYearToWineRequest(year)),
    changeQuantity: (quantity: number) => dispatch(addQuantityToWineRequest(quantity)),
    changeProducer: (producer: string) => dispatch(addProducerToWineRequest(producer)),
    changeCountry: (country: string) => dispatch(addCountryToWineRequest(country)),
    submit: (createWineRequest: CreateWineRequest) => submitCreateWine(dispatch, createWineRequest)
});

export default connect(mapStateToProps, mapActionsToProps)(CreateWineForm)