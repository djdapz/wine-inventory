import styled from "styled-components";
import Card from "@material-ui/core/Card";
import * as React from "react";
import {Wine} from "./Wine.types";
import {ActionMenu} from "../list/ActionMenu";
import {Dispatch} from "redux";
import {removeBottleFromCellar} from "../list/Cellar.actions";
import {connect} from "react-redux";
import {BottleSize} from "./BottleSize";

const StyledWineCard = styled(Card)`
  margin-bottom: 1rem;
  background-color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProducerHeading = styled.span`
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

const Badge = styled.span`
  background-color: #ff9800;
  border-radius: 2px;
  flex-grow: 0;
  padding: 1px 4px 0px;
  color: white;
  margin-left: .5rem;
`

const Country = styled.div`
  
`

const Year = styled.span`
  text-decoration: underline;
  margin-right: .5rem;
`

const WineType = styled.span`
`


interface ReduxActions {
    removeBottleFromCellar: (id: number) => void
}

interface Props {
    wine: Wine
}

const OriginalWoodenCase = (props: { owc: boolean }) => props.owc ?
    <Badge data-cy="original-wooden-case-indicator">OWC</Badge> : <span/>

const WineCard = (props: ReduxActions & Props) =>
    <StyledWineCard key={props.wine.year + props.wine.producer + props.wine.type}
                    data-cy={'wine-card'}>
        <CardSection>
            <div>
                <ProducerHeading data-cy={'producer'}>
                    {props.wine.producer}
                </ProducerHeading>
            </div>
            <div>
                <Year data-cy={'year'}>{props.wine.year}</Year>
                <WineType data-cy={'type'}>{props.wine.type}</WineType>
            </div>
            <Country data-cy={'country'}>
                {props.wine.country}
            </Country>

            <div>
                <span data-cy="bottle-size">{new BottleSize(props.wine.bottleSize).display}</span>
                <OriginalWoodenCase owc={props.wine.originalWoodenCase}/>
            </div>
            <div data-cy="notes">{props.wine.notes}</div>
        </CardSection>
        <LeftPanel>
            <CardSection>
                <div data-cy={'quantity'}><b>{props.wine.quantity}</b> left</div>
                {props.wine.cellarLocation ?
                    <div data-cy={'cellar-location'}>Cellar Location: {props.wine.cellarLocation}</div> : ""}
            </CardSection>
            <ActionMenu id={props.wine.id}
                        removeLabel={props.wine.quantity === 1 ? "Remove Last Bottle From Cellar" : "Remove One Bottle From Cellar"}/>
        </LeftPanel>
    </StyledWineCard>
;

const mapDispatchToProps = (dispatch: Dispatch) => ({
    removeBottleFromCellar: (id: number) => removeBottleFromCellar(dispatch, id),
});

export default connect<{}, ReduxActions, Props>(null, mapDispatchToProps)(WineCard)
