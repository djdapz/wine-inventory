import {WineForm} from "./WineForm";
import {StoreType} from "../../index";
import {connect} from "react-redux";
import * as React from "react";
import {Countries} from "../../redux/Country.reducer";
import {Wine} from "../../domain/Wine.types";
import {areEquivalent, isWineRequestReadyToSubmit, WineRequest} from "../../domain/CreateWine.types";
import {Dispatch} from "redux";
import {submitUpdateeWine} from "../../redux/UpdateWine.actions";

const isWineDifferentAndReadyToSubmit = (wine: Wine) => (wineRequest: WineRequest) => {
    const readyToSubmit = isWineRequestReadyToSubmit(wineRequest)
    const different = !areEquivalent(wine, wineRequest);
    return readyToSubmit && different;
}

type ReduxStoreProps = { countries: Countries };
type ReduxDispatchProps = { updateWine: (id: number) => (updatedWine: WineRequest) => void };
type PassedProps = { wine: Wine };

const UpdateWineForm = (props: ReduxStoreProps & ReduxDispatchProps & PassedProps) =>
    <WineForm wineFormRequest={props.wine}
              submit={props.updateWine(props.wine.id)}
              countries={props.countries}
              buttonText={"SAVE"}
              canBeSubmitted={isWineDifferentAndReadyToSubmit(props.wine)}/>

const mapStateToProps = (state: StoreType) => ({
    countries: state.countries
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateWine: submitUpdateeWine(dispatch)
})


export default connect<ReduxStoreProps, ReduxDispatchProps, PassedProps>(mapStateToProps, mapDispatchToProps)(UpdateWineForm)