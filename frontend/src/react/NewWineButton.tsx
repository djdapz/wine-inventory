import * as React from "react";
import {WineRequest} from "../domain/CreateWine.types";
import AddIcon from '@material-ui/icons/Add';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {openCreateWineForm} from "../redux/CreateWine.actions";
import styled from "styled-components";
import {Fab} from "@material-ui/core";

interface CreateWineFormProps {
    createWineFormRequest: WineRequest | null
    openForm: () => void
}

export const BottomButton = styled.div`
  z-index: 1;
  width: 5rem;
  height: 5rem;
  position: fixed;
  bottom:  0;
  right:  0;
`;

const CreateWineForm = (props: CreateWineFormProps) => props.createWineFormRequest ?
    <div/> : <BottomButton>
        <Fab id="new-wine-button"
             color={"primary"}
             onClick={() => props.openForm()}>
            <AddIcon/>
        </Fab>
    </BottomButton>;

const mapStateToProps = (state: any) => ({
    createWineFormRequest: state.createWineForm
});

const mapActionsToProps = (dispatch: Dispatch) => ({
    openForm: () => dispatch(openCreateWineForm())
});

export default connect(mapStateToProps, mapActionsToProps)(CreateWineForm)