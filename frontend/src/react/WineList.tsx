import * as React from "react";

import {connect} from 'react-redux'
import {Dispatch} from "redux";
import {getAllWine} from "../redux/Wine.actions";
import Card from "@material-ui/core/Card/Card";

import styled from "styled-components";
import {Wine} from "../domain/Wine.types";


interface WineListDispatchProps {
    getWines: () => void
}

interface WineListPassedProps {
    wines: Wine[],
}

type WineListProps = WineListDispatchProps & WineListPassedProps


const WineCard = styled(Card)`
  margin-bottom: 1rem;
  background-color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PipeWrapper = styled.span`
   margin: 0 .5rem;
`;

const Pipe = () => <PipeWrapper>|</PipeWrapper>;

const StyledWineList = styled.div`
  flex-grow:  1;
  padding: 1rem;
  max-width: 60rem;
  overflow-y: scroll;
`;

class WineList extends React.Component<WineListProps> {

    constructor(props: WineListProps) {
        super(props);
        this.props.getWines()
    }

    render() {
        return <StyledWineList id={'wine-list'}>
            {this.renderWines()}
        </StyledWineList>
    }

    private renderWines() {
        return this.props.wines.map((wine: Wine) => <WineCard key={wine.year + wine.producer + wine.type}
                                                              className={'wine-card'}>
            <div>
                <div>
                    <span className={'year'}>{wine.year}</span> <span className={'type'}>{wine.type}</span>
                    <Pipe/><span className={'producer'}>{wine.producer}</span>
                </div>
                <div>
                    <span className={'country'}>{wine.country}</span>
                </div>
            </div>
            <div className={'quantity'}><b>{wine.quantity}</b> left</div>
        </WineCard>)
    }
}

const mapStateToProps = (state: any) => ({
    wines: state.wines
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getWines: () => getAllWine(dispatch)
});

export default connect<WineListPassedProps, WineListDispatchProps, {}>(mapStateToProps, mapDispatchToProps)(WineList)