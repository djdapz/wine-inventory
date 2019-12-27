import * as React from "react";

import {connect} from 'react-redux'
import {getAllWine} from "../redux/Wine.actions";

import styled from "styled-components";
import {Wine} from "../domain/Wine.types";
import {StoreType} from "../index";
import {removeBottleFromCellar} from "../redux/Cellar.actions";
import WineCard from "./WineCard";
import {getSortedVisibleWine} from "../redux/selectors/filteredWine";
import {ThunkDispatch} from "redux-thunk";

interface WineListDispatchProps {
    getWines: () => void,
    removeBottleFromCellar: (id: number) => void,
}

interface WineListPassedProps {
    wines: Wine[]
}

type WineListProps = WineListDispatchProps & WineListPassedProps

const StyledWineList = styled.div`
  flex-grow:  1;
  padding: 1rem;
  box-sizing: border-box;
  max-width: 60rem;  
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  margin-top: 4.5rem;
`;

class WineList extends React.Component<WineListProps> {

    constructor(props: WineListProps) {
        super(props);
        this.props.getWines()
    }

    render() {
        return <StyledWineList id={'wine-list'}>
            {this.props.wines.map((wine: Wine) =>
                <WineCard key={wine.id}
                          wine={wine}/>)}
        </StyledWineList>
    }
}

const mapStateToProps = (state: StoreType) => ({
    wines: getSortedVisibleWine(state)
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any ,any ,any>) => ({
    getWines: () => dispatch(getAllWine()),
    removeBottleFromCellar: (id: number) => removeBottleFromCellar(dispatch, id),
});

export default connect<WineListPassedProps, WineListDispatchProps, {}, StoreType>(mapStateToProps, mapDispatchToProps)(WineList)