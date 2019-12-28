import {StoreType} from "../index";
import {useDispatch, useSelector} from "react-redux";
import {closeCreateWineForm, submitCreateWine} from "./CreateWine.actions";
import {isWineRequestReadyToSubmit, WineRequest} from "./CreateWine.types";
import {Fab, MuiThemeProvider} from "@material-ui/core";
import {whiteInputs} from "../app-bar/WineAppBar";
import {BottomButton} from "./NewWineButton";
import * as React from "react";
import styled from "styled-components";
import {WineForm} from "./WineForm";
import Drawer from "@material-ui/core/Drawer";
import Cancel from "@material-ui/icons/Cancel";
import {Countries} from "./Country.reducer";

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

export default () => {

    const dispatch = useDispatch();
    const submit = (createWineRequest: WineRequest) => dispatch(submitCreateWine(createWineRequest))
    const closeForm = () => dispatch(closeCreateWineForm())
    const showCreateWineForm = useSelector<StoreType, boolean>(state => state.showCreateWineForm)
    const countries = useSelector<StoreType,Countries>(state => state.countries)

    return <Drawer
        anchor="right"
        open={showCreateWineForm}
        onClose={() => null}>
        <MuiThemeProvider theme={whiteInputs}>
            <StyledForm id={"create-wine-form"}>

                <WineForm countries={countries}
                          submit={submit}
                          buttonText={"CREATE"}
                          canBeSubmitted={isWineRequestReadyToSubmit}>
                </WineForm>
                <BottomButton>
                    <Fab
                        id={"cancel-new-wine"}
                        color={"primary"}
                        onClick={closeForm}>
                        <Cancel/>
                    </Fab>
                </BottomButton>
            </StyledForm>
        </MuiThemeProvider>
    </Drawer>;
};