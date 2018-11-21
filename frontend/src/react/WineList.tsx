import * as React from "react";

import {connect} from 'react-redux'
import {Dispatch} from "redux";
import {getAllWine} from "../redux/Wine.actions";

import styled from "styled-components";
import {Wine} from "../domain/Wine.types";
import {StoreType} from "../index";
import {removeBottleFromCellar} from "../redux/Cellar.actions";
import WineCard from "./WineCard";
import {getVisibleWine} from "../redux/selectors/filteredWine";

interface WineListDispatchProps {
    getWines: () => void,
    removeBottleFromCellar: (id: number) => void,
}

interface WineListPassedProps {
    wines: Wine[]
}

type WineListProps = WineListDispatchProps & WineListPassedProps

const StyledWineList = styled.div`
  -webkit-overflow-scrolling: touch;
  flex-grow:  1;
  padding: .25rem 1rem;
  box-sizing: border-box;
  max-width: 60rem;  
  width: 100%;
  overflow-y: scroll;
  margin-right: auto;
  margin-left: auto;
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
    wines: getVisibleWine(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getWines: () => getAllWine(dispatch),
    removeBottleFromCellar: (id: number) => removeBottleFromCellar(dispatch, id),
});

export default connect<WineListPassedProps, WineListDispatchProps, {}>(mapStateToProps, mapDispatchToProps)(WineList)