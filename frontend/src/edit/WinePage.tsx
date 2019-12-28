import * as React from 'react';
import {useEffect} from 'react';
import styled from "styled-components";
import {StoreType} from "../index";
import {useDispatch, useSelector} from "react-redux";
import {Wine} from "../wine/Wine.types";
import UpdateWineForm from "./UpdateWineForm";
import {getAllWine} from "../wine/Wine.actions";
import {User} from 'user/types';
import {RouteComponentProps} from "react-router";

const WinePage = styled.div`
  padding-top: 5.5rem;
  padding-left: 3rem;
  padding-right: 3rem;
  overflow-y: scroll;
`

const FormContainer = styled.div`
  max-width: 25rem;
  padding-top: 1rem;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
`

export default (props : RouteComponentProps<{id: string}>) => {
    const wines = useSelector<StoreType, Wine[] | null>( state => state.wines)
    const user = useSelector<StoreType, User | null>( state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (wines == null ){
            dispatch(getAllWine())
        }
    }, [wines, dispatch])

    if(!user){
        return <WinePage>Waiting to login</WinePage>
    }

    if (wines === null) {
        return <WinePage data-cy="record-loading">Loading Record...</WinePage>
    }

    const wine = wines.find(it => it.id.toString() === props.match.params.id)

    if (wine === null || wine === undefined) {
        return <WinePage data-cy="not-found">Record not found, please return to the home page</WinePage>
    }

    return <FormContainer>
        <UpdateWineForm wine={wine}/>
    </FormContainer>
};