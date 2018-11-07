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
    openCreateWineForm,
    submitCreateWine
} from "./CreateWine.actions";
import Button from "@material-ui/core/Button/Button";
import styled from "styled-components";
import Cancel from "@material-ui/icons/Cancel";
import {BottomButton} from "./NewWineButton";

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
  transition: max-width .3s, padding-left .3s, padding-right .3s, width .3s;
  input{
    background-color: white;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
`;


const CreateWineForm = (props: CreateWineFormProps) => props.createWineFormRequest ?
    <StyledForm id="create-wine-form"
                isCollapsed={false}>
        <BottomButton>
            <Button
                id={"cancel-new-wine"}
                variant={'fab'}
                color={"secondary"}
                onClick={() => props.submit(props.createWineFormRequest!)}>
                <Cancel/>
            </Button>
        </BottomButton>
        <TextField
            className={'country-input'}
            label="Country"
            value={props.createWineFormRequest.country}
            onChange={(event) => props.changeCountry(event.target.value)}
            margin="normal"
            variant="filled"
        />
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
        <Button disabled={!props.createWineFormRequest.isComplete()}
                className={"submit-button"}
                color={"secondary"}
                variant={'contained'}
                onClick={() => props.submit(props.createWineFormRequest!)}>
            Create
        </Button>
    </StyledForm> : <StyledForm id="create-wine-form"
                                isCollapsed={true}/>

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