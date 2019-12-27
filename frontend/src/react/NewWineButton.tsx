import * as React from "react";
import AddIcon from '@material-ui/icons/Add';
import {useDispatch} from "react-redux";
import {openCreateWineForm} from "../redux/CreateWine.actions";
import styled from "styled-components";
import {Fab} from "@material-ui/core";

export const BottomButton = styled.div`
  z-index: 1;
  width: 5rem;
  height: 5rem;
  position: fixed;
  bottom:  0;
  right:  0;
`;

export default () => {
    const dispatch = useDispatch()

    return <BottomButton>
            <Fab id="new-wine-button"
                 color={"primary"}
                 onClick={() =>dispatch(openCreateWineForm())}>
                <AddIcon/>
            </Fab>
        </BottomButton>;
};
