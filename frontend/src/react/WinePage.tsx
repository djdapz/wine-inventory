import * as React from 'react';
import styled from "styled-components";
import {RouteComponentProps} from "react-router";
import {StoreType} from "../index";
import {connect} from "react-redux";
import {Wine} from "../domain/Wine.types";
import UpdateWineForm from "./wine-form/UpdateWineForm";
import {getAllWine} from "../redux/Wine.actions";
import {Dispatch} from "redux";

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

interface WineParamPrpos {
    id: string
}

interface WinePageProps {
    wines: Wine[] | null,
    getWines: () => void
}

const WinePageContent = (props: WineParamPrpos & WinePageProps) => {

    if (props.wines === null) {
        props.getWines()
        return <div data-cy="record-loading">Loading Record...</div>
    }
    const wine = props.wines.find(it => it.id.toString() === props.id)

    if (wine === null || wine === undefined) {
        return <div data-cy="not-found">Record not found, please return to the home page</div>
    }

    return <FormContainer>
        <UpdateWineForm wine={wine}/>
    </FormContainer>

}

const WinePageUnconnected = (props: RouteComponentProps<WineParamPrpos> & WinePageProps) =>
    <WinePage data-cy={"wine-page"}>
        <WinePageContent
            id={props.match.params.id}
            wines={props.wines}
            getWines={props.getWines}/>
    </WinePage>;


const mapStateToProps = (state: StoreType) => ({
    wines: state.wines
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getWines: () => getAllWine(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(WinePageUnconnected)