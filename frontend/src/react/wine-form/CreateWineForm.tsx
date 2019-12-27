import {StoreType} from "../../index";
import {connect} from "react-redux";
import {closeCreateWineForm, openCreateWineForm, submitCreateWine} from "../../redux/CreateWine.actions";
import {isWineRequestReadyToSubmit, WineRequest} from "../../domain/CreateWine.types";
import {MuiThemeProvider} from "@material-ui/core";
import {whiteInputs} from "../WineAppBar";
import {BottomButton} from "../NewWineButton";
import * as React from "react";
import styled from "styled-components";
import {WineForm, WineFormProps} from "./WineForm";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/es/Button";
import {Countries} from "../../redux/Country.reducer";
import Cancel from "@material-ui/icons/Cancel";
import {ThunkDispatch} from "redux-thunk";

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


interface StoreProps {
    countries: Countries,
    showCreateWineForm: boolean
}

interface DispatchProps {
    submit: (request: WineRequest) => void,
    openForm: () => void,
    closeForm: () => void
}

type CreateWineFormProps = WineFormProps & StoreProps & DispatchProps

const CreateWineForm = (props: CreateWineFormProps) =>
    <Drawer
        anchor="right"
        open={props.showCreateWineForm}
        onClose={() => null}>
        <MuiThemeProvider theme={whiteInputs}>
            <StyledForm id={"create-wine-form"}>

                <WineForm countries={props.countries}
                          submit={props.submit}
                          wineFormRequest={props.wineFormRequest}
                          buttonText={"CREATE"}
                          canBeSubmitted={isWineRequestReadyToSubmit}>
                </WineForm>
                <BottomButton>
                    <Button
                        id={"cancel-new-wine"}
                        variant={'fab'}
                        color={"primary"}
                        onClick={props.closeForm}>
                        <Cancel/>
                    </Button>
                </BottomButton>
            </StyledForm>
        </MuiThemeProvider>
    </Drawer>;


const mapStateToProps = (state: StoreType) => ({
    showCreateWineForm: state.showCreateWineForm,
    countries: state.countries
});

const mapActionsToProps = (dispatch: ThunkDispatch<any, any ,any>) => ({
    submit: (createWineRequest: WineRequest) => dispatch(submitCreateWine(createWineRequest)),
    openForm: () => dispatch(openCreateWineForm()),
    closeForm: () => dispatch(closeCreateWineForm())
});


export default connect<StoreProps, DispatchProps, {}, StoreType>(mapStateToProps, mapActionsToProps)(CreateWineForm)