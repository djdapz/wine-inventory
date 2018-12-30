import * as React from 'react';
import styled from "styled-components";
import {RouteComponentProps} from "react-router";
import {StoreType} from "../index";
import {connect} from "react-redux";
import {Wine} from "../domain/Wine.types";
import UpdateWineForm from "./wine-form/UpdateWineForm";

const WinePage = styled.div`
  margin-top: 4.5rem;
`
const WinePageUnconnected = (props: RouteComponentProps<{ id: string }> & { wines: Wine[] }) => {
    const wine = props.wines.find(it => it.id.toString() === props.match.params.id)!!
    return <WinePage data-cy={"wine-page"}>
        <div data-cy={'type'}>{wine.type}</div>
        <div data-cy={'producer'}>{wine.producer}</div>
        <div data-cy={'year'}>{wine.year}</div>
        <div data-cy={'quantity'}>{wine.quantity}</div>
        <div data-cy={'country'}>{wine.country}</div>
        <div data-cy={'notes'}>{wine.notes}</div>
        <div data-cy={'cellar-location'}>{wine.cellarLocation}</div>
        <div data-cy={'original-wooden-case-indicator'}>{wine.originalWoodenCase.toString()}</div>
        <div data-cy={'bottle-size'}>{wine.bottleSize}</div>
        <UpdateWineForm wine={wine}/>
    </WinePage>;
}


const mapStateToProps = (state: StoreType) => ({
    wines: state.wines
})

export default connect(mapStateToProps)(WinePageUnconnected)