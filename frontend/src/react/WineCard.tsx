import styled from "styled-components";
import Card from "@material-ui/core/Card/Card";
import * as React from "react";
import {Wine} from "../domain/Wine.types";
import {ActionMenu} from "./ActionMenu";
import {Dispatch} from "redux";
import {removeBottleFromCellar} from "../redux/Cellar.actions";
import {connect} from "react-redux";

const StyledWineCard = styled(Card)`
  margin-bottom: 1rem;
  background-color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProducerHeading = styled.div`
  font-size: large;
  font-weight: bold;
  margin-bottom: .25rem;
`;

const CardSection = styled.div`
  display: flex;
  flex-direction: column;
   justify-content: space-around;
   padding-right: 1rem;
   padding-left: 1rem;
`;

const LeftPanel = styled.div`
  text-align: right;
  display: flex;
`;


interface ReduxActions {
    removeBottleFromCellar: (id: number) => void
}

interface Props {
    wine: Wine
}

const WineCard = (props: ReduxActions & Props) =>
    <StyledWineCard key={props.wine.year + props.wine.producer + props.wine.type}
                    className={'wine-card'}>
        <CardSection>
            <ProducerHeading className={'producer'}> {props.wine.producer}</ProducerHeading>
            <div>
                <span className={'year'}>{props.wine.year}</span> <span className={'type'}>{props.wine.type}</span>
            </div>
            <div>
                <span className={'country'}>{props.wine.country}</span>
            </div>
        </CardSection>
        <LeftPanel>
            <CardSection>
                <div className={'quantity'}><b>{props.wine.quantity}</b> left</div>
                {props.wine.cellarLocation ?
                    <div className={'cellar-location'}>Cellar Location: {props.wine.cellarLocation}</div> : ""}
            </CardSection>
            <ActionMenu actions={[{
                label: props.wine.quantity === 1 ? "Remove Last Bottle From Cellar" : "Remove One Bottle From Cellar",
                action: () => props.removeBottleFromCellar(props.wine.id),
                className: 'remove-bottle-from-cellar'
            }]}/>
        </LeftPanel>
    </StyledWineCard>;


const mapDispatchToProps = (dispatch: Dispatch) => ({
    removeBottleFromCellar: (id: number) => removeBottleFromCellar(dispatch, id),
});

export default connect<{}, ReduxActions, Props>(null, mapDispatchToProps)(WineCard)
